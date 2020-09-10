from django.contrib import admin
from django.contrib.auth.models import User
from django.urls import path, include
from rest_framework import routers
from . import views
from eventapp.api.views import registration_view, EventList, EventCreate, EventUpdate, EventDelete
from eventapp.events.views import EventView
from eventapp.users.views import UserView
# from rest_framework.authtoken.views import obtain_auth_token



router = routers.DefaultRouter()
router.register(r'users', UserView)
router.register(r'events', EventView)


urlpatterns = [
	path('', include(router.urls)),
	path('register', registration_view, name="register"),
	path('Event-list', views.EventList, name="Event-list"),
	path('Event-create', views.EventCreate, name="Event-create"),
	path('Event-update/<str:pk>', views.EventUpdate, name="Event-update"),
	path('Event-delete/<str:pk>', views.EventDelete, name="Event-delete"),
	path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
