from django.db import models

class Login(models.Model):
    username = models.CharField(max_length=50)
    email = models.TextField()
    password = models.CharField(max_length=50)
    def __str__(self):
        """A string representation of the model."""
        return self.username
# Create your models here.
