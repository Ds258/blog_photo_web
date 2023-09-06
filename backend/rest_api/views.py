from django.shortcuts import render
from django.contrib.auth.models import auth
from django.shortcuts import render, redirect
from django.contrib import messages

# Create your views here.
def index(request):
    return render(request, 'index.html')

#Signin Function
def signin(request):
    username = request.POST['username']
    password = request.POST['password']

    user = auth.authenticate(username=username, password=password)

    if user is not None:
        auth.login(request, user)
        return redirect('/')
    else:
        messages.info(request, "Credentials invaild")
        return redirect('signin')