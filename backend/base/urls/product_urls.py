from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.get_products, name='products'),
    path('create/', views.create_product, name='product-create'),
    path('<str:pk>/', views.get_product, name='product'),


    path('update/<str:pk>/', views.update_product, name='product-update'),
    path('delete/<str:pk>/', views.delete_product, name='product-delete'),
]

