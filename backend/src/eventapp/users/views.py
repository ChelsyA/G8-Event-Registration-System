from django.shortcuts import render
from rest_framework import viewsets
from eventapp.events.serializers import EventSerializer
from eventapp.users.models import User, UserProfile

# Create your views here.


class UserView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = User.objects.all()