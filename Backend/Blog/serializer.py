from rest_framework import serializers
from Blog.models import Blog, Photo, Category

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['alt_image', 'url', 'heading_img']

class BlogSerializer(serializers.ModelSerializer):
    heading_url = serializers.SerializerMethodField()
    photos = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()

    def get_heading_url(self, obj):
        try:
            # Access the first related Photo object (assuming one heading image)
            photo = obj.photo_set.filter(heading_img=True).first()
            if photo:
                return photo.url
            else:
                return None  # Or a default value if no heading image exists
        except Photo.DoesNotExist:
            return None  # Handle cases where no related Photo objects exist

    def get_photos(self, obj):
        photos = obj.photo_set.filter(heading_img=False)  # Retrieve all related photos
        return PhotoSerializer(photos, many=True).data

    def get_categories(self, obj):
        categories = obj.id_category.values_list("name", flat=True)
        return list(categories)
    
    class Meta:
        model = Blog
        fields = ['id', 'heading', 'content', 'author', 'heading_url', 'categories', 'photos', 'created_at']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']