from rest_framework.decorators import api_view
from rest_framework.views import APIView
from Blog.serializer import BlogSerializer
from Blog.models import Blog
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
class IndexView(APIView):
    def get(self, request):
        try: 
            all_blog = Blog.objects.all()
        except Blog.DoesNotExist:
            return Response({'message': 'Get blogs field'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        serial_blog = BlogSerializer(all_blog, many=True).data

        return Response({'message': 'success', 'data': serial_blog}, status=status.HTTP_200_OK)

    def post(self, request):
        if not request.data:
            return Response({'Message': 'Request error'}, status=status.HTTP_400_BAD_REQUEST)
        
        heading = request.data.get('heading')
        content = request.data.get('content')
        heading_url = request.data.get('heading_url')



@api_view(['POST'])
def EditBlogView(request):
    return


@api_view(['POST'])
def DeleteBlogView(request):
    return
