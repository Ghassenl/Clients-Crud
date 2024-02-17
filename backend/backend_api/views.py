from django.shortcuts import render
from .models import Client
from .serializers import ClientSerializer
from rest_framework import viewsets

# Create your views here.
class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()