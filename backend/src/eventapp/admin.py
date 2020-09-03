from django.contrib import admin
from .models import User, Register

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'user_name', 'email', 'password', 'confirm_password', 'address', 'phone_number', 'city']

class RegisterAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'email', 'password']

admin.site.register(User, UserAdmin)
admin.site.register(Register, RegisterAdmin)
