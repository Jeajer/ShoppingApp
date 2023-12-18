from django.db import models

# Create your models here.


class Package(models.Model):
    name = models.CharField(max_length=200)
    quantity = models.JSONField()
    #listJson = models.JSONField()
    date = models.DateField()

    def __str__(self):
        return str(self.name)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)


class User(models.Model):
    name = models.CharField(max_length=100)
    # Các trường khác cho thông tin người dùng
