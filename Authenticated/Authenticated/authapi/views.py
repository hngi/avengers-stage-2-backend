from rest_framework import generics

from authentify import models
from . import serializers


class usernameauthentify(generics.ListCreateAPIView):
    queryset = models.Login.objects.all()
    serializer_class = serializers.LoginSerializer


class emailauthentify(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Login.objects.all()
    serializer_class = serializers.LoginSerializer

class passwordauthentify(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Login.objects.all()
    serializer_class = serializers.LoginSerializer