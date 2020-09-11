from rest_framework import serializers
import phonenumbers

from eventapp.models import User, UserProfile, Event


class UserRegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username', 'address', 'password', 'confirm_password', 'city', 'phone_number')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        raw_number = self.validated_data['phone_number']
        parsedNumber = phonenumbers.parse(
            raw_number, None) if raw_number is not None else None
        phone_number = phonenumbers.format_number(
            parsedNumber, phonenumbers.PhoneNumberFormat.NATIONAL) if parsedNumber else ""
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            address=self.validated_data['address'],
            city=self.validated_data['city'],
            phone_number=self.validated_data['phone_number'],
        )
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']
        if password != confirm_password:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        user_profile = UserProfile(user=user)
        user_profile.save()
        return user

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('title', 'time', 'location', 'room_capacity', 'speaker', 'tagline')

    def save(self):
        event = Event()
        event.save()
        return event

