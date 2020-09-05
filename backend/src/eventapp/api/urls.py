from django.urls import path
from eventapp.api.views import registration_view
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'eventapp'

urlpatterns = [
 	# path('login', ObtainAuthTokenView.as_view(), name="login"), 
	path('register', registration_view, name="register"),
]