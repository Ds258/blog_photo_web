from rest_framework.decorators import api_view
from rest_framework.views import APIView
from Blog.serializer import BlogSerializer
from Blog.models import Blog, Photo
from rest_framework.response import Response
from rest_framework import status
from .models import User

# Create your views here.
class IndexView(APIView):
    def get(self, request): # get all blogs for Blog page
        try: 
            all_blog = Blog.objects.all()
        except Blog.DoesNotExist:
            return Response({'message': 'Get blogs field'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serial_blog = BlogSerializer(all_blog, many=True).data

        return Response({'message': 'success', 'data': serial_blog}, status=status.HTTP_200_OK)

    def post(self, request): # post a blog
        if not request.data:
            return Response({'Message': 'Request error'}, status=status.HTTP_400_BAD_REQUEST)

        id_user = request.data.get('id_user')
        username = request.data.get('username')
        heading = request.data.get('title')
        content = request.data.get('content')
        heading_url = request.data.get('headImage')
        content_image = request.data.get('contentImage')

        try:
            user = User.objects.get(id=id_user)
        except User.DoesNotExist:
            return Response({'Message': 'User not found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        blog = Blog.objects.create(heading=heading, content=content, author=username, id_user=user)
        if not blog:
            return Response({'Message': 'Create object Blog error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        head_image = Photo.objects.create(alt_image=heading, url=heading_url, heading_img=True, id_blog=blog)
        if not head_image:
            return Response({'Message': 'Create object Head Image error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        for img in content_image:
            try:
                Photo.objects.create(alt_image="Image", url=img, id_blog=blog)
            except Exception as e:
                return Response({'Message': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response({'status': 'success'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def GetBlogView(request, id_blog):
    try:    
        view_blog = Blog.objects.get(id=id_blog)
    except Blog.DoesNotExist:
        return Response({'message': 'Blog not exists'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    serial_blog = BlogSerializer(view_blog).data

    return Response({'message': 'success', 'data': serial_blog}, status=status.HTTP_200_OK)


@api_view(['GET'])
def UserBlogView(request, id_user):
    if not id_user:
        return Response({'message': 'id_user not found'}, status=status.HTTP_404_NOT_FOUND)
    
    try:    
        user = User.objects.get(id=id_user)
    except User.DoesNotExist:
        return Response({'message': 'User not exists'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:    
        view_blog = Blog.objects.filter(id_user=user)
    except Blog.DoesNotExist:
        return Response({'message': 'Blog not exists'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    serial_blog = BlogSerializer(view_blog, many=True).data

    return Response({'message': 'success', 'data': serial_blog}, status=status.HTTP_200_OK)


@api_view(['POST'])
def EditBlogView(request):
    return


@api_view(['POST'])
def DeleteBlogView(request):
    return
