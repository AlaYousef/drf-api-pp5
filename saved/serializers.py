from django.db import IntegrityError
from rest_framework import serializers
from saved.models import Save


class SaveSerializer(serializers.ModelSerializer):
    """
    Serializer for the Save model
    The create method handles the unique constraint on 'owner' and 'recipe'
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Save
        fields = ['id', 'created_at', 'owner', 'recipe']

    """
    Handle duplicate bookmarks
    """
    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })