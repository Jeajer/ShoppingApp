from unittest.util import _MAX_LENGTH
from django.db import models


# Create your models here.
class Collab_filtering(models.Model):
    user = models.CharField(max_length=200)
    item = models.CharField(max_length=200)
    recommendation = models.JSONField()
