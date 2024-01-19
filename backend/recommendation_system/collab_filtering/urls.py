from rest_framework import routers
from .views import CollabFilteringViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'collabfiltering', CollabFilteringViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
