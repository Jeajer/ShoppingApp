from rest_framework import routers
from .views import ContentBaseViewSet, ContentBaseView
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'contentbase', ContentBaseViewSet)
router.register(r'content', ContentBaseView)

urlpatterns = [
    path('', include(router.urls)),
]
