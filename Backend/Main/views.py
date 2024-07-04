from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import random
from Blog.models import Blog
from datetime import timedelta
from django.utils import timezone
from Blog.serializer import BlogSerializer

# Create your views here.
@api_view(['GET'])
def SliderBlogView(request):
    now = timezone.now()
    three_days_ago = now - timedelta(days=3)
    
    # Get the IDs of blogs created within the last 3 days
    recent_blog_ids = Blog.objects.filter(created_at__gte=three_days_ago).values_list('id', flat=True)
    
    # Convert the QuerySet to a list and randomly select 5 IDs
    random_ids = random.sample(list(recent_blog_ids), min(len(recent_blog_ids), 5))
    
    # Fetch the blog posts corresponding to the randomly selected IDs
    try:
        random_blogs = Blog.objects.filter(id__in=random_ids)
    except Exception as e:
        print(e)
        return Response({"status": "error", "message": e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    if not random_blogs: 
        return Response({"status": "unsuccess"}, status=status.HTTP_204_NO_CONTENT)
    
    serial_blog = BlogSerializer(random_blogs, many=True).data
    
    return Response({"status": "success", "data": serial_blog}, status=status.HTTP_202_ACCEPTED)