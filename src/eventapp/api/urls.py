from django.urls import path
from eventapp.api.views import register_view, UserListView, UserRetrieveUpdateDestroy

app_name = 'eventapp'

urlpatterns = [
	path('users', UserListView.as_view(), name="users"),
	path('users/register', register_view, name="user_register"),
	path('users/<int:pk>/', UserRetrieveUpdateDestroy.as_view(), name="users"),
]