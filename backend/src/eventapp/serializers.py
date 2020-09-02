from rest_framework import serializers
from .models import Eventapp


class EventappSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventapp
        fields = ('id', 'first_name', 'last_name', 'email', 'password', 'confirm_password', 'address', 'phone_number', 'city')