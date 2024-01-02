from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    profile_pic = models.CharField(max_length=100, null=True)
    DOB = models.DateField(null=True)
    email = models.EmailField()
    password = models.TextField()
    privilege = models.BooleanField()
    create_date = models.DateTimeField(auto_now_add=True, null=True)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(('last login'), blank=True, null=True)

    