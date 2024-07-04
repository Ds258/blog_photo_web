from django.urls import path
from . import views

app_name = "Main"

urlpatterns = [
    path('slider/', views.SliderBlogView, name="SliderBlogView")
    
]