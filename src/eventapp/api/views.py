from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework import generics
from eventapp.permissions import IsAuthOrReadOnly
from rest_framework import permissions

from eventapp.api.serializers import EventSerializer, UserSerializer
from eventapp.models import Event, User


class UserListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,
                          permissions.IsAdminUser,)
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, IsAuthOrReadOnly,)
    queryset = User.objects.all()
    serializer_class = UserSerializer


class EventView(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()


@api_view(['POST', ])
def register_view(request):
    if request.method == 'POST':
        data = {}
        email = request.data.get('email', '0').lower()
        if checkEmail(email) != None:
            data['error_message'] = 'That email is already in use.'
            data['response'] = 'Error'
            return Response(data)

        username = request.data.get('username', '0')
        if validate_username(username) != None:
            data['error_message'] = 'That username is already in use.'
            data['response'] = 'Error'
            return Response(data)

        serializer = UserSerializer(data=request.data)

        password = request.data.get('password')
        password2 = request.data.get('password2')
        if password != password2:
            data['password'] = 'Password must match!'
            data['response'] = 'Error'
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            user = serializer.save()
            data['email'] = user.email
            data['username'] = user.username
            data['userId'] = user.pk
            data['is_success'] = True
            token = Token.objects.create(user=user)
            data['token'] = token.key
        else:
            data = serializer.errors
        return Response(data, status=status.HTTP_201_CREATED)


def validate_username(username):
    user = None
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return None
    if user != None:
        return username


def checkEmail(email):
    user = None
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return None
    if user != None:
        return email
