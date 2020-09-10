from django.db import models


# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    speaker = models.CharField(max_length=50)
    tagline = models.CharField(max_length=500)
    
    
    def __str__(self):
        return self.title