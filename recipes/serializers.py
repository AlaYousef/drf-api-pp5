from rest_framework import serializers
from recipes.models import Recipe


class RecipeSerializer(serializers.ModelSerializer):  
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    
    

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

        
    class Meta:
        model = Recipe
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'name', 'ingredients', 'steps', 'image', 'image_filter',
        ]