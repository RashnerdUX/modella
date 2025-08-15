import requests
from decouple import config
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action, api_view, permission_classes
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from django.shortcuts import get_object_or_404
from .models import WardrobeItem, Outfit, Recommendation
from .serializers import (
    UserSerializer,
    WardrobeItemSerializer,
    OutfitSerializer,
    RecommendationSerializer,
)
from django.contrib.auth.models import User
from .helpers import get_outfit_recommendation
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, status
from rest_framework.response import Response
import hmac, hashlib


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        owner = getattr(obj, 'owner', None) or getattr(obj, 'user', None)
        return owner == request.user


class WardrobeItemViewSet(viewsets.ModelViewSet):
    queryset = WardrobeItem.objects.all()
    serializer_class = WardrobeItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        qs = WardrobeItem.objects.filter(owner=self.request.user).order_by('-date_added')
        # Optional filtering params
        category = self.request.query_params.get('category')
        season = self.request.query_params.get('season')
        if category:
            qs = qs.filter(category=category)
        if season:
            qs = qs.filter(season=season)
        return qs

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class OutfitViewSet(viewsets.ModelViewSet):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Outfit.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, is_ai_generated=False)

    @action(detail=True, methods=['post'], url_path='add-items')
    def add_items(self, request, pk=None):
        outfit = self.get_object()
        item_ids = request.data.get('items', [])
        items = WardrobeItem.objects.filter(owner=request.user, id__in=item_ids)
        outfit.items.add(*items)
        return Response(OutfitSerializer(outfit).data)


class RecommendationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Recommendation.objects.filter(user=self.request.user).order_by('-created_at')

    @action(detail=True, methods=['post'], url_path='save-as-outfit')
    def save_as_outfit(self, request, pk=None):
        recommendation = self.get_object()
        outfit = Outfit.objects.create(
            user=request.user,
            name=f"Outfit for {recommendation.occasion or 'Occasion'}",
            occasion=recommendation.occasion,
            season='all',
            is_ai_generated=True
        )
        outfit.items.set(recommendation.items.all())
        return Response(OutfitSerializer(outfit).data, status=status.HTTP_201_CREATED)


class AuthRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            response = Response({
                'user': UserSerializer(user).data,
                'detail': 'Registered successfully'
            }, status=status.HTTP_201_CREATED)
            # Set cookies (HttpOnly)
            secure = not request.get_host().startswith('localhost')
            response.set_cookie('access_token', access_token, httponly=True, secure=secure, samesite='Lax')
            response.set_cookie('refresh_token', str(refresh), httponly=True, secure=secure, samesite='Lax')
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuthLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        response = Response({'user': UserSerializer(user).data, 'detail': 'Login successful'})
        secure = not request.get_host().startswith('localhost')
        response.set_cookie('access_token', access_token, httponly=True, secure=secure, samesite='Lax')
        response.set_cookie('refresh_token', str(refresh), httponly=True, secure=secure, samesite='Lax')
        return response


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def auth_logout(request):
    refresh_token = request.data.get('refresh')
    if refresh_token:
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception:
            pass
    response = Response({'detail': 'Logged out'})
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def auth_me(request):
    return Response({'user': UserSerializer(request.user).data})

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def initialize_payment(request): 
    # TODO: Change the amount to reflect the actual billing plans
    plan = request.query_params.get("plan")
    if plan == "everyday_style":
        amount = 10000  # Everyday style plan fee in kobo
    elif plan == "style_icon":
        amount = 120000  # Style icon plan fee in kobo
    else:
        return Response({'detail': 'Invalid plan or no plan was selected'}, status=status.HTTP_400_BAD_REQUEST)
    url = "https://api.paystack.co/transaction/initialize"
    data = {
        "email": request.user.email,
        "amount": amount,
    }
    paystack_auth = config("PAYSTACK_SECRET_KEY", default="Not available")
    headers = {"Authorization": f"Bearer {paystack_auth}"}
    r = requests.post(url, json=data, headers=headers)
    response = r.json()
    # Check for errors
    if r.status_code != 200:
        return Response({'detail': 'Payment initialization failed', 'error': response.get("message")}, status=status.HTTP_400_BAD_REQUEST)
    # TODO: Might need to store the access code
    access_code = response.get("data", {}).get("access_code")
    # Initialize payment process
    return Response({'detail': 'Payment initialized', 'access_code': access_code})

@api_view(['POST'])
def paystack_webhook(request):
    # verify Paystack signature
    secret = config("PAYSTACK_SECRET_KEY", default="")
    signature = request.META.get("HTTP_X_PAYSTACK_SIGNATURE", "")
    computed = hmac.new(secret.encode(), request.body, hashlib.sha512).hexdigest()
    if not hmac.compare_digest(computed, signature):
        return Response({'detail': 'Invalid signature'}, status=status.HTTP_400_BAD_REQUEST)

    event = request.data.get("event")
    # Note the value of the event depends on what the user paid.
    # If it was a subscription event, it'd be "subscription.create" or "subscription.update"
    # TODO: Ensure the transaction initialization is synced up with the webhook
    if event == "charge.success":
        data = request.data.get("data", {})
        reference = data.get("reference")
        customer_email = data.get("customer", {}).get("email")
        # TODO: lookup or create a Payment/Subscription record and mark as paid
        user = User.objects.filter(email=customer_email).first()
        if user:
            # Update user's profile here
            # TODO: Update the User model to handle free and premium users
        try:
            user = User.objects.get(email=customer_email)
            # Update user's profile here
            # TODO: Update the User model to handle free and premium users
            pass
        except User.DoesNotExist:
            user = None

    return Response({'status': 'ok'}, status=status.HTTP_200_OK)

class GenerateRecommendationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Expect: {"items": [ids...], "occasion": "string"}
        item_ids = request.data.get('items', [])
        occasion = request.data.get('occasion')
        items = WardrobeItem.objects.filter(owner=request.user, id__in=item_ids)
        if not items:
            return Response({'detail': 'No valid items provided'}, status=status.HTTP_400_BAD_REQUEST)

        item_payload = [{
            'id': i.id,
            'item_name': i.item_name,
            'category': i.category,
            'color': i.color,
            'pattern': i.pattern,
            'material': i.material,
            'season': i.season,
            'style_tags': i.style_tags,
            'brand': i.brand,
            'occasions': i.occasions,
            'layer': i.layer,
        } for i in items]

        # Call existing helper (Gemini)
        text = get_outfit_recommendation(item_payload, occasion)

        rec = Recommendation.objects.create(user=request.user, text=text, occasion=occasion)
        rec.items.set(items)
        return Response(RecommendationSerializer(rec).data, status=status.HTTP_201_CREATED)


class CookieTokenRefreshView(TokenRefreshView):
    """Override token refresh to set new cookies."""
    def post(self, request, *args, **kwargs):
        # Expect refresh cookie
        if 'refresh_token' not in request.COOKIES and 'refresh' not in request.data:
            return Response({'detail': 'No refresh token provided'}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        if 'refresh' not in data:
            data['refresh'] = request.COOKIES.get('refresh_token')
        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response({'detail': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
        access = serializer.validated_data.get('access')
        refresh = serializer.validated_data.get('refresh')  # Only present if rotated
        response = Response({'detail': 'Token refreshed'})
        secure = not request.get_host().startswith('localhost')
        if access:
            response.set_cookie('access_token', access, httponly=True, secure=secure, samesite='Lax')
        if refresh:
            response.set_cookie('refresh_token', refresh, httponly=True, secure=secure, samesite='Lax')
        return response