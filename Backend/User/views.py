from .serializer import ProfileSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import Profile, User
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ObjectDoesNotExist

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

        try:
            profile = Profile.objects.get(id_user=user)
        except ObjectDoesNotExist:
            return Response({'status': 'User profile not exists'}, status=status.HTTP_404_NOT_FOUND)
        
        data['profile'] = ProfileSerializer(profile).data

        return Response({'status': 'ok', 'data': data}, status=status.HTTP_200_OK)
    else:
        return Response({'status': 'Invalid login'}, status=status.HTTP_200_OK)
    

@api_view(['POST'])
def Signup(request):
    new_username = request.data.get('new_username')
    new_password = request.data.get('new_password')
    new_email = request.data.get('new_email')
    new_avatar = request.data.get('new_avatar')

    try:
        if check_exist(new_username):
            return Response({'status': 'exist'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            user = User.objects.create(username=new_username, password=new_password, email=new_email)
            user.password = make_password(new_password) # hash password
            user.save()
            Profile.objects.create(id_user=user, profile_picture=new_avatar)
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
    

@api_view(['POST'])
def Settings(request, id_user):
    update_account = {}
    valid_fields = ('username', 'old_password', 'new_password', 'email')

    for field in request.data:
        if field not in valid_fields:
            raise ValueError(f"Invalid field in request data: {field}")

        value = request.data.get(field)  # Get the value (handles optional fields)
        if value is not False:  # Update only if a value is provided
            update_account[field] = value

    update_profile = {}
    valid_fields = {'gender', 'dob', 'avatar', 'phone_number'}

    for field in request.data:
        if field not in valid_fields:
            raise ValueError(f"Invalid field in request data: {field}")

        value = request.data.get(field)  # Get the value (handles optional fields)
        if value is not False:  # Update only if a value is provided
            update_profile[field] = value

    user = User.objects.filter(id=id_user)
    if user is None:
        return Response({'status': 'User not exist'}, status=status.HTTP_404_NOT_FOUND)

    if update_account is not None:
        user.update(**update_account)

    if update_profile is not None:
        Profile.objects.filter(id=user).update(**update_profile)

    return Response({'status': 'update successfully'}, status=status.HTTP_200_OK)