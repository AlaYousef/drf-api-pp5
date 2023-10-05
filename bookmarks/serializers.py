from django.db import IntegrityError
from rest_framework import serializers
from bookmarks.models import Bookmark


class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Bookmark model
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Like
        fields = ['id', 'created_at', 'owner', 'post']

    def create(self, validated_data):
        """
        method to prevent duplicate bookmark for the same post
        """
        try:
            return super().create(validated_data)

        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })

