from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
import random
from datetime import datetime
from eventapp.models import Event, TokenCode, User
from rest_framework.response import Response
from rest_framework import status


def test(request, id):
    user = User.objects.get(id=3)
    token = TokenCode.objects.get(id=id)
    return JsonResponse({
        'code': token.code,
        # 'date' : sub,
    })


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


def remove_user_from_event(request, ui, ei):
    user = None
    event = None
    try:
        event = Event.objects.get(id=ei)
        user = User.objects.get(id=ui)
        event.attendees.remove(user)
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
            'is_success': True,
            'status': 200
        })
