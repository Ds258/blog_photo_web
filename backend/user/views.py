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
import json
from django.contrib.auth.hashers import make_password
import cloudinary
import cloudinary.uploader
import cloudinary.api

class UserSignin(APIView):
    #@csrf_exempt
    @permission_classes([AllowAny])
    #@api_view(['POST'])
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        #Using custom authentication for signing in
        user = SettingsBackend.authenticate(request, username=username, password=password) 
        if user is not None:
            login(request, user)
            data = UserSerializer(user).data
            return Response({'status': 'ok', 'data': data}, status=status.HTTP_200_OK) #must have status code
        else:
            return Response({'status': 'error'}, status=status.HTTP_401_UNAUTHORIZED)

class UserSignup(APIView):
    @permission_classes([AllowAny])
    def post(self, request):
        new_username = request.data.get('new_username')
        new_password = request.data.get('new_password')
        new_email = request.data.get('new_email')
        new_DOB = request.data.get('new_DOB')
        new_phoneNumber = request.data.get('new_phoneNumber')
        profile_picture = request.data.get('new_profilePicture')
        # upload_result = None
        # if 'new_profilePicture' in request.FILES:
        #     profile_picture = request.FILES['new_profilePicture']

        #     # Upload image to Cloudinary
        #     upload_result = cloudinary.uploader.upload(profile_picture)

        if SettingsBackend.check_exist(request, new_username):
            return Response({'status': 'exist'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            user = User.objects.create(username=new_username, profile_pic=profile_picture, password=new_password , email=new_email, DOB=new_DOB, phone_number=new_phoneNumber, privilege=True)
            user.password = make_password(new_password)
            user.save()
            return Response({'status': 'success'}, status=status.HTTP_200_OK)

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
            # username = data.get('username')
            # password = data.get('password')
            # email = data.get('email')
            # DOB = data.get('DOB')
            # if SettingsBackend.check_exist(request, username):
            #     return JsonResponse({'status': 'exist'})
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



