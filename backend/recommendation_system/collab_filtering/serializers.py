from rest_framework import serializers
from .models import Collab_filtering


class CollabFilteringModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collab_filtering
        fields = ("user", "item", "recommendation")
