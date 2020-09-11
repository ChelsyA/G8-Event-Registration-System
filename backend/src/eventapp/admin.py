from django.contrib import admin
from django.contrib.auth.models import Group
from eventapp.models import User, Event

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = [ 'first_name', 'last_name', 'email', 'username']

class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'time', 'location', 'room_capacity', 'speaker', 'tagline']

admin.site.register(User, UserAdmin)
admin.site.register(Event, EventAdmin)
# admin.site.unregister(Group)