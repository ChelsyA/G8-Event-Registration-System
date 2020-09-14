from django.contrib import admin
from django.contrib.auth.models import Group
from .models import User, Event, TokenCode

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name']


class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'time', 'location',
                    'room_capacity', 'speaker', 'tagline']


class TokenCodeAdmin(admin.ModelAdmin):
    list_display = ['code', 'expire_date', 'user']


admin.site.register(User, UserAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(TokenCode, TokenCodeAdmin)
admin.site.unregister(Group)
