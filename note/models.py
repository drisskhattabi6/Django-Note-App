from django.db import models
from django.contrib.auth.models import User


class Note(models.Model) :

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        # return self.title
        return f"{self.id}"
    