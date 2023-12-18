from rest_framework import viewsets
from ..models import Package, User
from .serializers import PackageModelSerializer

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageModelSerializer
