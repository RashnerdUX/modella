from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    WardrobeItemViewSet,
    OutfitViewSet,
    RecommendationViewSet,
    AuthRegisterView,
    AuthLoginView,
    auth_logout,
    auth_me,
    GenerateRecommendationView,
    initialize_payment,
    paystack_webhook,
    GoogleSignInView,
    FacebookSignInView
)
from .views import CookieTokenRefreshView

app_name = 'app'

router = DefaultRouter()
router.register(r'wardrobe', WardrobeItemViewSet, basename='wardrobe')
router.register(r'outfits', OutfitViewSet, basename='outfit')
router.register(r'recommendations', RecommendationViewSet, basename='recommendation')

urlpatterns = [
    path('auth/register/', AuthRegisterView.as_view(), name='auth-register'),
    path('auth/login/', AuthLoginView.as_view(), name='auth-login'),
    path('auth/social/facebook/', FacebookSignInView.as_view(), name='auth-social-facebook'),
    path('auth/social/google/', GoogleSignInView.as_view(), name='auth-social-google'),
    path('auth/logout/', auth_logout, name='auth-logout'),
    path('auth/me/', auth_me, name='auth-me'),
    path('auth/refresh/', CookieTokenRefreshView.as_view(), name='token-refresh'),
    path('ai/recommend/', GenerateRecommendationView.as_view(), name='generate-recommendation'),
    path('payment/initialize/', initialize_payment, name='initialize-payment'),
    path('webhook/paystack/', paystack_webhook, name='paystack-webhook'),
    path('', include(router.urls)),
]