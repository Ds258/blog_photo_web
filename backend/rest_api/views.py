from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from .settings import SettingsBackend
import json
from .models import User

# Create your views here.
def index(request):
    return render(request, 'index.html')

#Signin Function
@csrf_exempt
def signin(request):
    if request.method == 'POST':        
        data = json.loads(request.body) #get the request and fill in data variable
        username = data.get('username')
        password = data.get('password')
        user = SettingsBackend.authenticate(request, username=username, password=password)
        #check = User.objects.filter(username='ds25082002@gmail.com').values()
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'ok'})
        else:
            return JsonResponse({'status': 'error'})
            

    return JsonResponse({'status': 'error'})

@csrf_exempt
def signup(request):
    if request.method == 'POST':        
        data = json.loads(request.body) #get the request and fill in data variable
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        DOB = data.get('DOB')
        user = User.objects.create(username=username , password=password , email=email, DOB=DOB, privilege=True)
        user.password = make_password(password)
        user.save()
        print('user created')
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'})
     