from django.db import models
from django.core.validators import RegexValidator
from cloudinary.models import CloudinaryField

# Create your models here.
class User(models.Model):
    phone_regex = RegexValidator(regex=r'/(84|0[3|5|7|8|9])+([0-9]{8})\b/g', message="Phone number must be entered in the format: '+0988888888'. Up to 10 digits allowed.")

    username = models.CharField(max_length=100, unique=True)
    profile_pic = models.TextField(blank=True, null=True)
    DOB = models.DateField(null=True)
    email = models.EmailField()
    phone_number = models.CharField(validators=[phone_regex], max_length=10, blank=True, null=True)
    password = models.TextField()
    privilege = models.BooleanField()
    create_date = models.DateTimeField(auto_now_add=True, null=True)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(('last login'), blank=True, null=True)


    