from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from validate_email import validate_email

from eventapp.api.serializers import UserRegistrationSerializer
from eventapp.models import User

@api_view(['POST', ])
def registration_view(request):
    if request.method == 'POST':
        data = {}
        email = request.data.get('email', '0').lower()
        if validate_email(email) == None:
            data['error_message'] = 'That email is already in use. sdcsdc'
            data['response'] = 'Error'
            return Response(data)
        
        username = request.data.get('username', '0')
        if validate_username(username) != None:
            data['error_message'] = 'That username is already in use.'
            data['response'] = 'Error'
            return Response(data)
        
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = 'successfully registered new user.'
            data['email'] = user.email
            data['username'] = user.username
            data['pk'] = user.pk
            # token = Token.objects.get(user=user).key
            # data['token'] = token
        else:
            data = serializer.errors
        return Response({
            'is_success': True,
        })

def validate_username(username):
    user = None
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return None
    if user != None:
        return username