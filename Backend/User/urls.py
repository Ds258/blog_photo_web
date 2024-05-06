from django.urls import path, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.views import serve

urlpatterns = [
    #path('', views.index, name='index'), #homepage
    path('signin/', views.Signin, name='Signin'), # sign in
    path('signup/', views.Signup, name='Signup'), # sign up
    path('settings/', views.Settings, name='Settings'), # sign up
]