from rest_framework import routers
from .views import PackageViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'package', PackageViewSet)

urlpatterns = [
    path('', include(router.urls))
]
