from rest_framework import serializers
from eventapp.models import User


class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',
                  'address', 'password1', 'password2', 'city', 'phone_number')
        extra_kwargs = {
            'password1': {'write_only': True}
        }

    # def save(self):
    #     user = User(
    #         email=self.validated_data['email'],
    #         username=self.validated_data['username'],
    #         first_name=self.validated_data['first_name'],
    #         last_name=self.validated_data['last_name'],
    #         address=self.validated_data['address'],
    #         city=self.validated_data['city'],
    #         phone_number=self.validated_data['phone_number'],
    #     )
    
    #     password1 = self.validated_data['password1']
    #     password2 = self.validated_data['password2']
    #     if password1 != password2:
    #         raise serializers.ValidationError(
    #             {'password': 'Passwords must match.'})
    #     user.set_password(password1)
    #     user.save()
    #     return user
