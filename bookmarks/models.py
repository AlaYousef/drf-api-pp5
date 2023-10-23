from django.db import models
from django.contrib.auth.models import User
from recipes.models import Recipe


class Bookmark(models.Model):
    """
    bookmark model, related to 'owner' and 'post'.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(
        Recipe, related_name='bookmarks', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        """
        A user can't bookmark the same post twice.
        """
        unique_together = ['owner', 'recipe']

    def __str__(self):
        return f'{self.owner} {self.recipe}'
