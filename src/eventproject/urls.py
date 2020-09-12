from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from eventapp.views import test

urlpatterns = [
    path('admin/', admin.site.urls),
    path('test/', test),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('api/eventapp/', include('eventapp.api.urls')),
    path('', TemplateView.as_view(template_name='index.html'))
]
