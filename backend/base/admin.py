from django.contrib import admin
from .models import *

admin.site.register(Product)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)

class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at', 'total_price', 'is_paid', 'paid_at', 'is_delivered', 'delivered_at', ]
    list_filter = ['is_paid', 'is_delivered',]
admin.site.register(Order, OrderAdmin)


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['name', 'product', 'rating', 'created_at']
admin.site.register(Review, ReviewAdmin)
