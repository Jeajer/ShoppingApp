from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('recommend_system_package', views.RecommendationSystemViewSet, basename='recommend_system_package')

urlpatterns = [
    
]

urlpatterns += router.urls