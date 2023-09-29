from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'), #homepage
    path('api/signin/', views.signin, name='login'), #login
    path('api/signup/', views.signup, name='signup') #signup
]