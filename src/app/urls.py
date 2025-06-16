from django.urls import path
from . import views

app_name = 'app'

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('blog/', views.blog, name='blog'),
    path('contact/', views.contact, name='contact'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('privacy-policy/', views.privacypolicy, name='privacy'),
    path('terms/', views.terms, name='terms'),
    path('wardrobe/add/', views.add_wardrobe_item, name='add_wardrobe_item'),
    path('wardrobe/', views.wardrobe_list, name='wardrobe_list'),
    path('outfit/create/', views.create_outfit, name='create_outfit'),
    path('outfit/result/outfit/<int:outfit_id>/', views.outfit_result, name='outfit_result'),
    path('outfit/result/recommendation/<int:recommendation_id>/', views.outfit_result, name='recommendation_result'),
]