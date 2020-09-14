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


class Event(models.Model):
    title = models.CharField(max_length=200)
    time_choice = (
        ('Morning', 'Morning'),
        ('Midmorning', 'Midmorning'),
        ('Afternoon', 'Afternoon'),
    )
    time = models.CharField(max_length=30, blank=False, choices=time_choice)
    location = models.CharField(max_length=100)
    room_capacity = models.CharField(max_length=50)
    speaker = models.CharField(max_length=50)
    tagline = models.CharField(max_length=100)
    attendees = models.ManyToManyField(User, blank=True)

    def count_room_capacity(self):

        return

    def __str__(self):
        return self.title


class TokenCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    expire_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.user.username
