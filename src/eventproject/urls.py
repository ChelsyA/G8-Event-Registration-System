from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView

from eventapp.views import (add_user_to_event, eventbookings,
                            remove_user_from_event, test, userbookings)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('test/<int:id>/', test),
    path('userbookings/<int:id>/', userbookings, name="userbookings"),
    path('eventbookings/<int:id>/', eventbookings, name="eventbookings"),
    path('adduserevent/<int:ui>/<int:ei>/',
         add_user_to_event, name="add_user_to_event"),
    path('removeuserevent/<int:ui>/<int:ei>/',
         remove_user_from_event, name="remove_user_from_event"),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('api/', include('eventapp.api.urls', namespace="eventapp")),
    path('', TemplateView.as_view(template_name='index.html'))
]
