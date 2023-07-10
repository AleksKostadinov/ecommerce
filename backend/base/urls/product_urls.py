from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.get_products, name='products'),

    path('create/', views.create_product, name='product-create'),
    path('upload/', views.upload_image, name='image-upload'),

    path('<str:pk>/reviews/', views.create_product_review, name='create-review'),
    path('top/', views.get_top_products, name='top-products'),
    path('<str:pk>/', views.get_product, name='product'),

    path('update/<str:pk>/', views.update_product, name='product-update'),
    path('delete/<str:pk>/', views.delete_product, name='product-delete'),
]

