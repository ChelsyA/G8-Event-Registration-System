from django.contrib import admin
from django.contrib.auth.models import Group
from .models import User, Event

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'address', 'city', 'phone_number']

class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'time', 'location', 'room_capacity', 'speaker', 'tagline']

admin.site.register(User, UserAdmin)
admin.site.register(Event, EventAdmin)
admin.site.unregister(Group)