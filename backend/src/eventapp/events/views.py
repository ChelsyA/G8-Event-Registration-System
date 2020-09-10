from django.shortcuts import render
from rest_framework import viewsets
from eventapp.api.serializers import EventSerializer
from eventapp.events.models import Event

# Create your views here.


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()