from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    address = models.TextField(blank=True)
    city = models.CharField(max_length=200, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    
    def __str__(self):
        return self.username


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
    attendees = models.ManyToManyField(User)
    
    def __str__(self):
        return self.title