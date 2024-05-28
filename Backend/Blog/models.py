from django.utils import timezone
from django.db import models
import uuid

from Backend.User.models import User

# Create your models here.
class Blog(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    heading = models.TextField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    author = models.TextField(blank=True, null=True)
    id_user = models.ForeignKey(User, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)


class Photo(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    alt_image = models.TextField(blank=True, null=True)
    url = models.URLField(max_length=300)
    heading_img = models.BooleanField(default=False)
    id_blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

