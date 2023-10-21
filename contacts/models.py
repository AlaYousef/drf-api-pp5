from django.db import models
from django.contrib.auth.models import User


class Contact(models.Model):
    """
    Contact model, related to User and Post
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=80)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner} : {self.subject}"
