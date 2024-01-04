from telnetlib import STATUS
from django.http import JsonResponse
from django.shortcuts import render
from grpc import StatusCode
from rest_framework import viewsets

from package import request_handler
from .models import Content_base
from .serializers import ContentBaseModelSerializer
from rest_framework.views import APIView
from rest_framework.views import Response, status
from package import *


class ContentBaseViewSet(viewsets.ModelViewSet):
    queryset = Content_base.objects.all()
    serializer_class = ContentBaseModelSerializer


class ContentBaseView(viewsets.ModelViewSet):
    queryset = Content_base.objects.all()
    serializer_class = ContentBaseModelSerializer

    def create(self, request, *args, **kwargs):
        # Xử lý logic cho phương thức POST ở đây
        print(request.data.get("name"))
        modified_data = {
            "name": request.data.get("name"),
            "recommendation": request_handler.requestCB(request.data.get("name")),
        }
        serializer = self.get_serializer(data=modified_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )
