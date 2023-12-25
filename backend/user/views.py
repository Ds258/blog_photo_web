from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from .settings import SettingsBackend
from django.conf import settings
import json
from .models import User

# Create your views here.
# def index(request):
#      return render(request, 'index.html')

#Sign in Function
@csrf_exempt
def signin(request):
    if request.method == 'POST':        
        data = json.loads(request.body) #get the request and fill in data variable
        username = data.get('username')
        password = data.get('password')
        #Using custom authentication for signing in
        user = SettingsBackend.authenticate(request, username=username, password=password) 
        #check = User.objects.filter(username='ds25082002@gmail.com').values()
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'ok', 
                                 'username': username,
                                 'password': password,
                                 'email': user.email,
                                 'dob': user.DOB})
        else:
            return JsonResponse({'status': 'error'})
    return JsonResponse({'status': 'error'})

#Sign up function
@csrf_exempt
def signup(request):
    if request.method == 'POST':        
        data = json.loads(request.body) #get the request and fill in data variable
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        DOB = data.get('DOB')
        if SettingsBackend.check_exist(request, username):
            return JsonResponse({'status': 'exist'})
        else:
            user = User.objects.create(username=username , password=password , email=email, DOB=DOB, privilege=True)
            user.password = make_password(password)
            user.save()
            return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'})


