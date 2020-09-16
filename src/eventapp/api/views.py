from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from rest_framework import generics, permissions, status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from eventapp.api.serializers import EventBookingSerializer, EventSerializer, UserSerializer
from eventapp.models import Event, EventBooking, TokenCode, User
from eventapp.permissions import IsAuthOrReadOnly
from eventapp.utils import Util


class EventView(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventBookingView(viewsets.ModelViewSet):
    queryset = EventBooking.objects.all()
    serializer_class = EventBookingSerializer


class RegisterView(generics.GenericAPIView):

    serializer_class = UserSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        if Util.checkEmail(request.data.get('email')) != None:
            data['error_message'] = 'That email is already in use.'
            data['response'] = 'Error'
            return Response({
                'error_message': 'That email is already in use.'
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        user_data = serializer.data
        user_data['is_success'] = True
        user = User.objects.get(username=user_data['username'])
        code = Util.generate()
        token = TokenCode(user=user, code=code)
        token.save()
        current_site = get_current_site(request).domain
        absurl = 'http://'+current_site+"/api/verify-email/" + \
            "?token="+code+"&ui="+str(user.id)
        email_body = 'Hi '+user.username + \
            ' Use the link below to verify your email \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email'}

        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        t = request.GET.get('token')
        try:
            user = User.objects.get(id=request.GET.get('ui'))
            token = TokenCode.objects.get(user_id=user.id)
            if token.code == t:
                if not user.is_active:
                    token.delete()
                    user.is_active = True
                    user.save()
        except User.DoesNotExist or Token.DoesNotExist:
            return Response({'error': 'User does not exist or Token code is not valid'}, 
                            status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'email': 'Successfully activated'}, 
                            status=status.HTTP_200_OK)


@api_view(['POST', 'GET', 'DELETE'])
def event_booking_view(request):
    if request.method == "POST":
        user = None
        event = None
        try:
            uid = request.data.get('user_id')
            eid = request.data.get('event_id')
            ticket = request.data.get('ticket')
            phone_number = request.data.get('phone_number')

            event = Event.objects.get(id=eid)
            user = User.objects.get(id=uid)
            length = Util.lengthEventBooking(eid)
            if int(event.room_capacity) <= int(length):
                return Response({'error': 'Sorry, room is alreay full', 'status_code': 800})
            books = EventBooking.objects.filter(event_id__exact=event.id)
            if Util.checkIfUserHasBook(books, user.id):
                return Response({
                    'result': "It seems you have booked the event already!",
                    'status_code': 700
                })
            else:
                event.attendees.add(user)
                book = EventBooking(user=user, event=event,
                                    ticket=ticket, phone_number=phone_number)
                book.save()
                return Response({
                    'result': "Booked successfully",
                }, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({
                'error': 'User does not exist',
            }, status=status.HTTP_404_NOT_FOUND)

        except Event.DoesNotExist:
            return Response({
                'error': 'Event does not exist',
            }, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        try:
            uid = request.data.get('user_id')
            user = User.objects.get(id=uid)
            books = EventBooking.objects.all().filter(user_id__exact=user.id)
            data = []
            count = 0
            for book in books:
                count += 1
                data.append({
                    'ticket': book.ticket,
                    'book_id': book.id,
                    'user_id': book.user_id,
                    'event_id': book.event_id,
                    'event_title': book.event.title,
                    'event_location': book.event.location,
                    'event_speaker': book.event.speaker,
                    'event_tagline': book.event.tagline,
                })
            data.append({'length': count})
        except User.DoesNotExist:
            return Response({'error': 'User does not exist!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(data)

    if request.method == 'DELETE':
        try:
            bid = request.data.get('book_id')
            book = EventBooking.objects.get(id=bid)
            book.delete()
        except EventBooking.DoesNotExist:
            return Response({'error': 'Event you tried to remove is not found'},
                            status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'result': 'Event has been removed'}, 
                            status=status.HTTP_200_OK)       


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user_view(request, pk):
    data = {}
    if request.method == 'GET':
        user = None
        try:
            user = User.objects.get(pk=pk)
            data['username'] = user.username
            data['first_name'] = user.first_name
            data['last_name'] = user.last_name
            data['email'] = user.email
            data['address'] = user.address
            data['city'] = user.city
        except User.DoesNotExist:
            return Response(data, status=status.HTTP_200_OK)
        if user != None:
            return Response({'error': 'User does not exist!'}, 
                            status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'PUT':
        user = None
        try:
            user = User.objects.get(pk=pk)
            user.first_name = request.data.get('first_name')
            user.email = request.data.get('email')
            user.last_name = request.data.get('last_name')
            user.address = request.data.get('address')
            user.city = request.data.get('city')
            if request.data.get('password') is not None:
                if request.data.get('password') == request.data.get('password2'):
                    user.set_password(request.data.get('password'))
                else:
                    return Response({'error': 'Password must match!'}, 
                                    status=status.HTTP_400_BAD_REQUEST,)

        except User.DoesNotExist:
            return Response({'error': 'User does not exist!'}, 
                            status=status.HTTP_404_NOT_FOUND)
        if user != None:
            user.save()
            data['id'] = user.id
            data['username'] = user.username
            data['email'] = user.email
            data['is_success'] = True
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(data, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user = None
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            pass
        else:
            result = user.delete()
            return Response({
                'Method': 'DELETE',
                'id': pk,
                'result': result
            })
