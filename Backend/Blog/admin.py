from django.contrib import admin

from Blog.models import Blog, Category, Photo

# Register your models here.
admin.site.register(Blog)
admin.site.register(Category)
admin.site.register(Photo)