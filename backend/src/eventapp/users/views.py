from django.shortcuts import render
from rest_framework import viewsets
from eventapp.api.serializers import UserRegistrationSerializer
from eventapp.models import User, UserProfile

# Create your views here.


class UserView(viewsets.ModelViewSet):
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()