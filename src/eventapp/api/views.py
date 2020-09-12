from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

from eventapp.api.serializers import UserRegistrationSerializer, EventSerializer
from eventapp.models import User, UserProfile, Event

@api_view(['POST', ])
def registration_view(request):
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
        
        serializer = UserRegistrationSerializer(data=request.data)
        
        password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')
        if password != confirm_password:
            return Response({
                'Password': 'Password must match!'
            })
            
        if serializer.is_valid():
            user = serializer.save()
            data['email'] = user.email
            data['username'] = user.username
            data['userId'] = user.pk
            data['is_success'] = True
            # token = Token.objects.get(user=user).key
            # data['token'] = token
        else:
            data = serializer.errors
        return Response(data)

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


@api_view(['GET'])
def EventView(request):
    api_urls = {
        'List':'/Event-list/',
        'Create':'/Event-create',
        'Update':'/Event-update/<str:pk>/',
        'Delete':'/Event-delete/<str:pk>/',
        }
    
    return Response(api_urls)

@api_view(['GET'])
def EventList(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def EventCreate(request):
    serializer = EventSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def EventUpdate(request, pk):
    event = Event.objects.get(id=pk)
    serializer = EventSerializer(instance=event, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def EventDelete(request, pk):
    event = Event.objects.get(id=pk)
    event.delete()
    
    return Response('Event successfully deleted!')



