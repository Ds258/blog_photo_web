from .serializer import UserSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import Profile, User
from django.contrib.auth.hashers import make_password


@api_view(['POST'])
def Signin(request):
    username = request.data.get('username', False)
    password = request.data.get('password', False)

    if not username or not password:
        return Response({'status': 'error'}, status=status.HTTP_401_UNAUTHORIZED)
    
    user = authenticate(request, username=username, password=password)
    
    if user:
        try:
            login(request, user)
        except Exception as e:
            raise e
        
        data = UserSerializer(user).data

        return Response({'status': 'oke', 'data': data}, status=status.HTTP_200_OK)
    else:
        return Response({'status': 'Invalid login'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def Signup(request):
    new_username = request.data.get('new_username')
    new_password = request.data.get('new_password')
    new_email = request.data.get('new_email')

    try:
        if check_exist(new_username):
            return Response({'status': 'exist'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            user = User.objects.create(username=new_username, password=new_password, email=new_email)
            user.password = make_password(new_password) # hash password
            user.save()
            Profile.objects.create(id_user=user)
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
    except:
        return Response({'status': 'Sign up error'}, status=status.HTTP_403_FORBIDDEN)


# check if user has already existed
def check_exist(username):
    try:
        user = Profile.objects.get(username=username)
        return True
    except:
        return False
    
