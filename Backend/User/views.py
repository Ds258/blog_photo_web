from django.shortcuts import get_object_or_404
from .serializer import ProfileSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import Profile, User
from django.contrib.auth.hashers import make_password, check_password
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
        if Check_exist(new_username):
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
def Check_exist(username):
    try:
        user = Profile.objects.get(username=username)
        return True
    except ObjectDoesNotExist:
        return False
    

@api_view(['POST'])
def Settings(request, id_user):
    if not request.data:
        return Response({'status': 'error', 'message': 'Request error'}, status=status.HTTP_400_BAD_REQUEST)

    new_password = request.data.get('new_password')
    old_password = request.data.get('old_password')

    update_account = {}
    valid_fields = ('username', 'email')

    if new_password and old_password: 
        if Check_password(old_password, new_password, id_user):
            update_account['password'] = make_password(new_password)
            # print(update_account['password'])
        else:
            return Response({'status': 'unsuccess', 'message': 'Password not match'}, status=status.HTTP_200_OK)

    for field in request.data:
        if field not in valid_fields:
            continue

        value = request.data.get(field)  # Get the value (handles optional fields)
        if value is not False:  # Update only if a value is provided
            update_account[field] = value

    update_profile = {}
    valid_fields = ('gender', 'dob', 'profile_picture', 'phone_number')

    for field in request.data:
        if field not in valid_fields:
            continue

        value = request.data.get(field)  # Get the value (handles optional fields)
        if value is not False:  # Update only if a value is provided
            update_profile[field] = value

    # Update User's account
    try:
        User.objects.filter(id=id_user).update(**update_account)
    except:
        return Response({'status': 'error', 'message': 'Update user error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    user = get_object_or_404(User, id=id_user)

    # Update User's profile
    try:
        Profile.objects.filter(id_user=user).update(**update_profile)
    except:
        return Response({'status': 'error', 'message': 'Update profile error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    profile = get_object_or_404(Profile, id_user=user)

    data = UserSerializer(user).data
    data['profile'] = ProfileSerializer(profile).data

    if not data:
        return Response({'status': 'error', 'message': 'Serializer error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({'status': 'success', 'data': data}, status=status.HTTP_200_OK)


# Check if old password matches the one in database
def Check_password(old_password, new_password, id_user):
    if not old_password or not new_password:
        return False
    
    try:
        user = User.objects.get(id=id_user)
    except ObjectDoesNotExist:
        raise ValueError("User not exist")
    
    matches = check_password(old_password, user.password)
    if matches:
        return True
    
    return False
    
    
