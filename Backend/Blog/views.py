from rest_framework.decorators import api_view
from rest_framework.views import APIView
from Blog.serializer import BlogSerializer, CategorySerializer
from Blog.models import Blog, Photo, Category
from rest_framework.response import Response
from rest_framework import status
from .models import User

# Create your views here.
class IndexView(APIView):
    def get(self, request): # get all blogs for Blog page
        try: 
            all_blog = Blog.GetAllBlog()
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
        category = request.data.get('category')
        content = request.data.get('content')
        heading_url = request.data.get('headImage')
        content_image = request.data.get('contentImage')

        try:
            user = User.objects.get(id=id_user)
        except User.DoesNotExist:
            return Response({'Message': 'User not found'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        try:
            blog = Blog.objects.create(heading=heading, content=content, author=username, id_user=user)
            cate = Category.objects.filter(id__in=category)
            blog.id_category.add(*cate)
        except Exception as e:
            print(e)
            return Response({'Message': 'Create object Blog error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            head_image = Photo.objects.create(alt_image=heading, url=heading_url, heading_img=True, id_blog=blog)
        except Exception as e:
            print(e)
            return Response({'Message': 'Create object Head Image error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        for img in content_image:
            try:
                Photo.objects.create(alt_image="Image", url=img, id_blog=blog)
            except Exception as e:
                return Response({'Message': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response({'status': 'success'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def GetCategoryView(request):
    try:
        all_category = Category.objects.all()
    except Exception as e:
        print(e)
        return Response({'message': 'Cannot get categories'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    serial_category = CategorySerializer(all_category, many=True).data
    return Response({'message': 'success', 'data': serial_category}, status=status.HTTP_200_OK)


@api_view(['GET'])
def GetBlogView(request, id_blog):
    try:    
        view_blog = Blog.objects.get(id=id_blog)
    except Blog.DoesNotExist:
        return Response({'message': 'Blog not exists'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    serial_blog = BlogSerializer(view_blog).data
    # print(serial_blog)
    
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
def EditBlogView(request, id_blog):
    if not request.data:
        return Response({'message': 'Request error'}, status=status.HTTP_400_BAD_REQUEST)
    # print(request.data)
    update_content = {}
    valid_fields = ("heading", "content", "headImage")
    for field in request.data:
        if field in valid_fields and request.data.get(field) is not None:
            update_content[field] = request.data.get(field)
    
    try:
        update_blog = Blog.objects.filter(id=id_blog)
        if update_content is not None:
            update_blog.update(**update_content)
        
        if request.data.get("category") is not None:
            category = request.data.get("category")
            cate = Category.objects.filter(id__in=category)
            # update_blog.id_category.clear()
            blog = Blog.objects.get(id=id_blog)
            blog.id_category.set(cate)
    except Exception as e:
        return Response({'status': 'unsuccess', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

    # if "headImage" in request.data:
    #     head_img = request.data.get("headImage")
    #     try:
    #         Photo.objects.filter(id_blog__in=update_blog, heading_img=True).update(url=head_img)
    #     except Exception as e:
    #         print(e)
            # return Response({'status': 'unsuccess', 'message': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response({'status': 'success'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def DeleteBlogView(request, id_blog):
    if not id_blog:
        return Response({'message': 'id_blog not found'}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        blog = Blog.objects.get(id=id_blog)
        blog.delete()
    except Exception as e:
        return Response({'status': 'unsuccess', 'message': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

    return Response({'status': 'success'}, status=status.HTTP_200_OK) 
