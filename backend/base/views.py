from rest_framework.response import Response
from rest_framework.decorators import api_view
from .products import products

@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',

        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/<id>/reviews/',

        '/api/products/delete/<id>/',
        '/api/products/update/<id>/',
    ]
    return Response(routes)

@api_view(['GET'])
def get_products(request):
    return Response(products)

@api_view(['GET'])
def get_product(request, pk):
    product = ''
    for i in products:
        if i['_id'] == pk:
            product = i
            break

    return Response(product)
