from django.conf.urls import url
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from eventapp.api.views import EventBookingView, EventView, RegisterView, VerifyEmail, event_booking_view, user_view, users

router = DefaultRouter()
router.register('events', EventView, basename='events')
router.register('eventbookings', EventBookingView, basename='eventbookings')


app_name = 'eventapp'


urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name="register"),
    path('verify-email/', VerifyEmail.as_view(), name="verify-email"),
    path('user/', user_view, name="user"),
    path('users/', users, name="users"),
    path('event-book/', event_booking_view, name="event-book"),
    path('event-book/<int:pk>/', event_booking_view, name="event-book"),
    path('user/<int:pk>/', user_view, name="user-detail"),
]
