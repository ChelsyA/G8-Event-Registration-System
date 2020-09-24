from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from knox import views as knox_views

from eventapp.views import LoginView, add_user_to_event, eventbookings, remove_user_from_event, userbookings

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('api/', include('eventapp.api.urls', namespace="eventapp")),
    path('login/', LoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    path('userbookings/<int:id>/', userbookings, name="userbookings"),
    path('eventbookings/<int:id>/', eventbookings, name="eventbookings"),
    path('adduserevent/<int:ui>/<int:ei>/',
         add_user_to_event, name="add_user_to_event"),
    path('removeuserevent/<int:ui>/<int:ei>/',
         remove_user_from_event, name="remove_user_from_event"),
]
