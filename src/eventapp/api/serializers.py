from rest_framework import serializers

from eventapp.models import Event, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',
                  'address', 'password', 'city', 'phone_number')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def save(self):
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            address=self.validated_data['address'],
            city=self.validated_data['city'],
            phone_number=self.validated_data['phone_number'],
        )

        user.set_password(self.validated_data['password'])
        user.save()
        return user


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'title', 'time', 'location', 'speaker', 'tagline')
