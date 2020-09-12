from django.urls import path, include
from rest_framework.routers import DefaultRouter
from eventapp.api.views import register_view, UserListView, UserRetrieveUpdateDestroy, EventView

router = DefaultRouter()
router.register('events', EventView, basename='events')


app_name = 'eventapp'

urlpatterns = [
    path('events/', include(router.urls)),
	path('users/', UserListView.as_view(), name="users"),
	path('users/register', register_view, name="user_register"),
	path('users/<int:pk>/', UserRetrieveUpdateDestroy.as_view(), name="users"),
]