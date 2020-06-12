from rest_framework import serializers
from authentify import models


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'username',
            'email',
            'password',
        )
        model = models.Login