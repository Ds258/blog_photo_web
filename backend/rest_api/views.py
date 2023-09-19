from django.contrib.auth.models import auth
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import json


# Create your views here.
def index(request):
    return render(request, 'index.html')

#Signin Function
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body) #get the request and fill in data variable
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'ok'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid email or password'})

    return JsonResponse({'status': 'error', 'message': 'Invalid method'})
     