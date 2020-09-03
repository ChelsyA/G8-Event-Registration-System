from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    user_name = models.CharField(max_length=30, null=False)
    email = models.EmailField(max_length=30, null=False)
    password = models.CharField(max_length=30, null=False)
    confirm_password = models.CharField(max_length=30, null=False)
    address = models.CharField(max_length=50, null=True)
    phone_number = PhoneNumberField()
    city = models.CharField(max_length = 30)
    
    
    def __str__(self):
        return self.first_name

class Register(models.Model):
    user_name = models.EmailField(max_length=30, null=False)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=50)

    def __str__(self):
        return self.email
