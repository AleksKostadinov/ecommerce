from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer, ProductSerializer
from rest_framework import status

@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def add_order_items(request):
    user = request.user
    data = request.data

    order_items = data['order_items'] # ?

    if order_items and len(order_items) == 0:
        return Response({'detail': 'No order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            payment_method=data['payment_method'],
            tax_price=data['tax_price'],
            shipping_price=data['shipping_price'],
            total_price=data['total_price']
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shipping_address']['address'],
            city=data['shipping_address']['city'],
            postal_code=data['shipping_address']['postal_code'],
            country=data['shipping_address']['country']
        )

        for i in order_items:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url
            )

        product.count_in_stock -= item.qty
        product.save()

    serializer = OrderSerializer(order, many=False)
    
    return Response(serializer.data)

