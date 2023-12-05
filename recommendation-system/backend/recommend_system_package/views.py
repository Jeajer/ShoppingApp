from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models

# Create your views here.
class RecommendationSystemViewSet(viewsets.ModelViewSet):
    queryset = models.Recommendation_system.objects.all()
    serializer_class = serializers.RecommendationSystemSerializer