from rest_framework import serializers
from ..models import Package


class PackageModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ("id", "name", "quantity", "date")
