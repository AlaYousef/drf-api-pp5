from django.urls import path
from recipes import recipe

urlpatterns = [
    path('recipes/', views.RecipeList.as_view()),
    path('recipes/<int:pk>/', views.RecipeDetail.as_view()),
    ]
