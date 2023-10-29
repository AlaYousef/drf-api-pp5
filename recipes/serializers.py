from rest_framework import serializers
from recipes.models import Recipe
from like_recipe.models import Like
from saved.models import Save

class RecipeSerializer(serializers.ModelSerializer):  
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    like_id = serializers.SerializerMethodField()
    save_id = serializers.SerializerMethodField()
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    saved_count = serializers.ReadOnlyField()
    


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
        
    def get_save_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            save = Save.objects.filter(
                owner=user, recipe=obj
            ).first()
            return save.id if save else None
        return None
        
    class Meta:
        model = Recipe
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'name', 'ingredients', 'steps', 'image', 'image_filter',
            'like_id', 'save_id', 'likes_count', 'comments_count','saved_count',
        ]