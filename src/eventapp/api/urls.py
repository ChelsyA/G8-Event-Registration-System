from django.conf.urls import url
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from eventapp.api.views import EventView, RegisterView, VerifyEmail, user_view

router = DefaultRouter()
router.register('events', EventView, basename='events')


app_name = 'eventapp'


urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name="register"),
    path('verify-email/', VerifyEmail.as_view(), name="verify-email"),
    path('user/', user_view, name="user"),
    path('user/<int:pk>/', user_view, name="user-detail"),
]
