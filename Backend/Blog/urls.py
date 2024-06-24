from django.urls import path, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.views import serve

app_name = 'Blog'

urlpatterns = [
    path('index/', views.IndexView.as_view(), name='IndexView'), #Create blog
    path('post/', views.IndexView.as_view(), name='IndexView'), #Upload blog
]