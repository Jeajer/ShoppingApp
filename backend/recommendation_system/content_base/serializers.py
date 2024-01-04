from rest_framework import serializers
from .models import Content_base


class ContentBaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content_base
        fields = ("name", "recommendation")
