from telnetlib import STATUS
from django.http import JsonResponse
from django.shortcuts import render
from grpc import StatusCode
from rest_framework import viewsets
from package import request_handler
from .models import Collab_filtering
from .serializers import CollabFilteringModelSerializer
from rest_framework.views import APIView
from rest_framework.views import Response, status
from package import *


class CollabFilteringViewSet(viewsets.ModelViewSet):
    queryset = Collab_filtering.objects.all()
    serializer_class = CollabFilteringModelSerializer

