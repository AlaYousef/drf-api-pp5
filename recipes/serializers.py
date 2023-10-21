from rest_framework import serializers
from recipes.models import Recipe
from likes.models import Like
from bookmarks.models import Bookmark


class RecipeSerializer(serializers.ModelSerializer):  
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    like_id = serializers.SerializerMethodField()
    bookmark_id = serializers.SerializerMethodField()

    """
    A rest framework validate method to validate 
    the uploaded image (image field)
    """
    def validate_image(self, value):
        if value.size > 1024 * 1024 *2:
            raise serializers.ValidationError(
                'The image size is larger than 2MB!'
        )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'The image width is larger than 4096px'
        )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'The image height islarger than 4096px'
        )
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, recipe=obj
            ).first()
            return like.id if like else None
        return None

    def get_bookmark_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            bookmark = Bookmark.objects.filter(
                owner=user, recipe=obj
            ).first()
            return bookmark.id if bookmark else None
        return None
        
    class Meta:
        model = Recipe
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'name', 'ingredients', 'steps', 'image', 'image_filter',
            'like_id','bookmark_id'

        ]