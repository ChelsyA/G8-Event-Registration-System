from django.contrib.auth.models import AbstractUser
from django.db import models
from phone_field import PhoneField

# Create your models here.
class User(AbstractUser):
    address = models.TextField(blank=True)
    city = models.CharField(max_length=200, blank=True)
    phone_number = PhoneField(max_length=15, blank=True)
    
    def __str__(self):
        return self.username

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # first_name = models.CharField(max_length=50)
    # last_name = models.CharField(max_length=50)
    # email = models.EmailField(max_length=100, unique = True)
    # username = models.CharField(max_length=50, unique = True)
    password = models.CharField(max_length=50)
    password2 = models.CharField(max_length=50)
    
    def __str__(self):
        return self.user.username

class Event(models.Model):
    title = models.CharField(max_length=200)
    time_choice = (
            ('Morning', 'Morning'),
            ('Afternoon', 'Afternoon'),
            ('Evening', 'Evening'),
        )
    time = models.CharField(max_length=30, blank=False, choices=time_choice)
    location = models.CharField(max_length=100)
    room_capacity = models.CharField(max_length=50)
    speaker = models.CharField(max_length=50)
    tagline = models.CharField(max_length=100)
    
    
    def __str__(self):
        return self.title

# class EventBooking(models.Model):
    