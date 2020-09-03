from django.contrib import admin
from .models import Eventapp

# Register your models here.

class EventappAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'password', 'confirm_password', 'address', 'phone_number', 'city']


admin.site.register(Eventapp, EventappAdmin)
