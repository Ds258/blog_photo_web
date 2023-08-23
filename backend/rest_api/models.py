from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100)
    profile_pic = models.CharField(max_length=100, unique=True)
    DOB = models.DateField()
    email = models.EmailField()
    password = models.CharField()
    privilege = models.BooleanField()
    create_date = models.DateTimeField(auto_now_add=True)