from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import login
from .serializer import UserSerializer
from .settings import SettingsBackend
from django.conf import settings
from .models import User

class AuthUser(APIView):
    @permission_classes([AllowAny])
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        #Using custom authentication for signing in
        user = SettingsBackend.authenticate(request, username=username, password=password) 
        if user is not None:
            login(request, user)
            return Response({'status': 'ok'})
        else:
             return Response({'status': 'error'}, status=status.HTTP_401_UNAUTHORIZED)

    # @csrf_exempt
    # def signin(request):
    #     if request.method == 'POST':        
    #         data = json.loads(request.body) #get the request and fill in data variable
    #         username = data.get('username')
    #         password = data.get('password')
    #         #Using custom authentication for signing in
    #         user = SettingsBackend.authenticate(request, username=username, password=password) 
    #         #check = User.objects.filter(username='ds25082002@gmail.com').values()
    #         if user is not None:
    #             login(request, user)
    #             return JsonResponse({'status': 'ok', 
    #                                'username': username,
    #                                'password': password,
    #                                'email': user.email,
    #                                'dob': user.DOB})
    #         else:
    #             return JsonResponse({'status': 'error'})
    #     return JsonResponse({'status': 'error'})

    # @csrf_exempt
    # def signup(request):
    #     if request.method == 'POST':        
    #         data = json.loads(request.body) #get the request and fill in data variable
    #         username = data.get('username')
    #         password = data.get('password')
    #         email = data.get('email')
    #         DOB = data.get('DOB')
    #         if SettingsBackend.check_exist(request, username):
    #             return JsonResponse({'status': 'exist'})
    #         else:
    #             user = User.objects.create(username=username , password=password , email=email, DOB=DOB, privilege=True)
    #             user.password = make_password(password)
    #             user.save()
    #             return JsonResponse({'status': 'success'})
    #     return JsonResponse({'status': 'error'})

# Create your views here.
# def index(request):
#      return render(request, 'index.html')

#Sign in Function


#Sign up function


@api_view(['GET'])
def getData(request):
    person = User.objects.all()
    serializer = UserSerializer(person, many=True)
    return Response(serializer.data)



