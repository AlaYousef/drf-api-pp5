from rest_framework import generics, permissions
from drf_api_pp5.permissions import IsOwnerOrReadOnly
from saved.models import Save
from saved.serializers import SaveSerializer


class SaveList(generics.ListCreateAPIView):
    """
    List or create a save list if use is logged in.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = SaveSerializer
    queryset = Save.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SaveDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a bookamrk or delete it by id if you own it.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = SaveSerializer
    queryset = Save.objects.all()