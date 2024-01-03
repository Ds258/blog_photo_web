from django.urls import path, re_path
from django.views.generic import TemplateView
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.views import serve

urlpatterns = [
    #path('', views.index, name='index'), #homepage
    #re_path(r'', TemplateView.as_view(template_name='index.html')),
    path('signin/', views.UserSignin.as_view(), name='signin'), #login
    path('signup/', views.UserSignup.as_view(), name='signup'),
    #path('signin/', views.signin, name='signin'),
    #path('signup/', views.signup, name='signup'), #signup
    path('test/', views.getData, name='getData')
    #path('api/getinfo/', views.get_user_info, name='get_user_info') #Get user information
]