from django.shortcuts import render
from rest_framework import viewsets
from .serializers import EventappSerializer
from .models import Eventapp

# Create your views here.
class EventappView(viewsets.ModelViewSet):
    serializer_class = EventappSerializer
    queryset = Eventapp.objects.all()