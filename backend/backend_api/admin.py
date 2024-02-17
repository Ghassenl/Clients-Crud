from django.contrib import admin
from .models import Client
# Register your models here.

class ClientAdmin(admin.ModelAdmin):
    list = ('name', 'gender', 'job')

    admin.site.register(Client)