from django.db import models

# Create your models here.
class Client(models.Model):
    name = models.CharField(max_length=250)
    gender = models.CharField(max_length=200)
    job = models.CharField(max_length=350)

    def __str__(self):
        return self.name