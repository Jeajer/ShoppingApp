from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.
class Content_base(models.Model):
    name = models.CharField(max_length = 200)
    recommendation = models.JSONField()
