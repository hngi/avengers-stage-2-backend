"""Authenticated URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from . import views
from django.urls import path,include

urlpatterns = [
    
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.RegistrationView.as_view(), name="register"),
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('reset/', views.ResetEmailView.as_view(), name="reset"),
    path('confirm/', views.ConfirmEmailView.as_view(), name="confirm"),
    path('user/', views.UserView.as_view(), name="user")
]
