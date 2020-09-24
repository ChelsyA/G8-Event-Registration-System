from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
import random
from datetime import datetime
from eventapp.models import Event, TokenCode, User, EventBooking
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login

from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView


class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)


def test(request, book_id):
    user = None
    event = None
    try:
        book = EventBooking.objects.get(id=book_id)
        # return JsonResponse({
        #     'id': book.id,
        #     'user_id': book.user_id,
        #     'event_id': book.event_id,
        # })
        event = Event.objects.get(id=book.event_id)
        user = User.objects.get(id=book.user_id)
        event.attendees.remove(user)
        book.delete()
        
    except User.DoesNotExist:
        return JsonResponse({
            'error': 'User does not exist',
            'status': 404
        })
    except Event.DoesNotExist:
        return JsonResponse({
            'error': 'Event does not exist',
            'status': 404
        })
    except EventBooking.DoesNotExist:
        return JsonResponse({
            'error': 'Event booking does not exist',
            'status': 404
        })
    else:
        return JsonResponse({
            'is_success': True,
            'status': 200
        })


def lengthEventBooking(eid):
    books = EventBooking.objects.filter(event_id__exact=eid)
    count = 0
    if books is None:
        return 0
    for book in books:
        count += 1
    return count


def user_book_history(request, id):
    books = EventBooking.objects.all().filter(user_id__exact=id)
    data = []
    count = 0
    for book in books:
        count += 1
        data.append({
            'ticket': book.ticket,
            'user_id': book.user_id,
            'event_id': book.event_id,
            'event_title': book.event.title,
            'event_location': book.event.location,
            'event_speaker': book.event.speaker,
            'event_tagline': book.event.tagline,
        })
    data.append({'length': count})
    return JsonResponse(data, safe=False)


def userbookings(request, id):
    user = User.objects.get(id=id)
    users = []
    for e in user.event_set.all():
        users.append({
            'id': e.id,
            'time': e.time,
            'location': e.location,
            'speaker': e.speaker,
            'tagline': e.tagline,
        })

    return JsonResponse(users, safe=False)


def eventbookings(request, id):
    ev = Event.objects.get(id=id)
    events = []
    count = 0
    for u in ev.attendees.all():
        count += 1
        events.append({
            'id': u.id,
            'name': u.get_full_name(),
            'residental_address': u.address,
            'phone_number': u.phone_number,
            'email': u.email,
        })

    print(f"Count: {count}")
    return JsonResponse(events, safe=False)


def add_user_to_event(request, ui, ei):
    user = None
    event = None
    try:
        event = Event.objects.get(id=ei)
        user = User.objects.get(id=ui)
        event.attendees.add(user)
    except User.DoesNotExist:
        return JsonResponse({
            'error': 'User does not exist',
            'status': 404
        })
    except Event.DoesNotExist:
        return JsonResponse({
            'error': 'Event does not exist',
            'status': 404
        })
    else:
        return JsonResponse({
            'events': event.title + ": " + str(event.id),
            'users': user.username,
            'status': 200
        })


def remove_user_from_event(request, book_id):
    user = None
    event = None
    try:
        book = EventBooking.objects.get(id=book_id)
        event = Event.objects.get(id=book.event_id)
        user = User.objects.get(id=book.user_id)
        event.attendees.remove(user)
        book.delete()
    except User.DoesNotExist:
        return JsonResponse({
            'error': 'User does not exist',
            'status': 403
        })
    except Event.DoesNotExist:
        return JsonResponse({
            'error': 'Event does not exist',
            'status': 404
        })
    except EventBooking.DoesNotExist:
        return JsonResponse({
            'error': 'Event booking does not exist',
            'status': 405
        })
    else:
        return JsonResponse({
            'is_success': True,
            'status': 200
        })

def delete_event(request, eid):
    try:
        event = Event.objects.get(id=eid)
        event.delete()
    except Event.DoesNotExist:
        return JsonResponse({
            'error': 'Event does not exist',
            'status': 404
        })
    else:
        return JsonResponse({
            'is_success': True,
            'status': 200
        })