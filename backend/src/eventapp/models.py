from django.db import models
from django.contrib.auth.models import AbstractUser
# from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class User(AbstractUser):
    address = models.TextField(blank=True)
    city = models.CharField(max_length=200, blank=True)
    # phone_number = PhoneNumberField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    
    def __str__(self):
        return self.username

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.user.username