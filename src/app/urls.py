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
)
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'app'

router = DefaultRouter()
router.register(r'wardrobe', WardrobeItemViewSet, basename='wardrobe')
router.register(r'outfits', OutfitViewSet, basename='outfit')
router.register(r'recommendations', RecommendationViewSet, basename='recommendation')

urlpatterns = [
    path('auth/register/', AuthRegisterView.as_view(), name='auth-register'),
    path('auth/login/', AuthLoginView.as_view(), name='auth-login'),
    path('auth/logout/', auth_logout, name='auth-logout'),
    path('auth/me/', auth_me, name='auth-me'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('ai/recommend/', GenerateRecommendationView.as_view(), name='generate-recommendation'),
    path('', include(router.urls)),
]