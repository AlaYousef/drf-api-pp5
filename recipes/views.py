from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from drf_api_pp5.permissions import IsOwnerOrReadOnly
from .models import Recipe
from .serializers import RecipeSerializer


class RecipeList(generics.ListCreateAPIView):
    """
    List / create a recipes if logged in
    The perform_create method associates the recipe post with the logged in user.
    """
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Recipe.objects.all()



    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a recipe and edit or delete it if you own it.
    """
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Recipe.objects.all()
       