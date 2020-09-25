from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from knox import views as knox_views
from rest_framework.documentation import include_docs_urls

from eventapp.views import LoginView, delete_event,add_user_to_event, eventbookings, remove_user_from_event, userbookings

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('remove_user_book/<int:book_id>/', remove_user_from_event),
    path('delete_event/<int:eid>/', delete_event),
    path('api/', include('eventapp.api.urls', namespace="eventapp")),
    path('login/', LoginView.as_view(), name='knox_login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox_logoutall'),
    url(r'^docs/', include_docs_urls(title='OctaVents')),
#     path('userbookings/<int:id>/', userbookings, name="userbookings"),
#     path('eventbookings/<int:id>/', eventbookings, name="eventbookings"),
#     path('adduserevent/<int:ui>/<int:ei>/',
#          add_user_to_event, name="add_user_to_event"),
]
