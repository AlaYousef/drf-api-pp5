from django.urls import path
from liks import views

urlpatterns = [
    path('liks/', views.LikeList.as_view()),
    path('liks/<int:pk>/', views.LikeDetail.as_view()),
]