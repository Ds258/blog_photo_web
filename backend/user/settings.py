from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from .models import User

class SettingsBackend(BaseBackend):
    #authenticate user
    def authenticate(self, request=None, username=None, password=None):
        user = User.objects.get(username=username)
        if user is not None:
            if check_password(password, user.password):
                return user
        return None
    
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
        
    def check_exist(self, request=None, username=None):
        try:
            user = User.objects.get(username=username)
            return True
        except User.DoesNotExist:
            return False