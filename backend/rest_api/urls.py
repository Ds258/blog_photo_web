from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'), #homepage
    path('api/login/', views.login, name='login'), #login
]