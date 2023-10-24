from rest_framework import generics, permissions
from drf_api_pp5.permissions import IsOwnerOrReadOnly
from .models import Contact
from .serializers import ContactSerializer


class ContactList(generics.ListCreateAPIView):
    """
    List/create contacts if logged in.
    """
    serializer_class = ContactSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Contact.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ContactDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a contact message / update or delete it.
    """
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()