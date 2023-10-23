from django.urls import path
from saved import views

urlpatterns = [
    path('bookmarks/', views.SaveList.as_view()),
    path('bookmarks/<int:pk>/', views.SaveDetail.as_view()),
]