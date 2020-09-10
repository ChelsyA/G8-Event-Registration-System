from django.contrib import admin
from eventapp.models import User
from eventapp.events.models import Event

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = [ 'first_name', 'last_name', 'email', 'username']

class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'location', 'speaker', 'tagline']

admin.site.register(User, UserAdmin)
admin.site.register(Event, EventAdmin)