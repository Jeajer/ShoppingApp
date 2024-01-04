from django.db import models

# Create your models here.


class Package(models.Model):
    name = models.CharField(max_length=200)
    quantity = models.JSONField()
    date = models.DateField()

    def __str__(self):
        return str(self.name)
