from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    """
    Serializer for the Contact model
    """
    owner = serializers.ReadOnlyField(source="owner.username")
    profile_id = serializers.ReadOnlyField(source="owner.profile.id")
    profile_image = serializers.ReadOnlyField(source="owner.profile.image.url")
    created_at = serializers.SerializerMethodField()

    def get_created_at(self, obj):
        """
        Returns a human readable time since the
        comment was created
        """
        return naturaltime(obj.created_at)

    class Meta:
        """
        Lists all the filds to be included in
        the data returned by this api
        """
        model = Contact
        fields = [ "id", "owner", "subject", "message", "profile_id", "profile_image", "created_at" ]