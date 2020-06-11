# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import requests, json
from django.shortcuts import HttpResponse
from django.contrib.sites.shortcuts import get_current_site




from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from allauth.account.views import ConfirmEmailView
from django.contrib.auth import get_user_model
from django.urls import reverse

# Create your views here.
def index(request):
    return render(request,'index.html')

def register(request):

    if request.method == 'POST' :
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            passwords = form.cleaned_data['password1']
            user = authenticate(username = username, password = passwords)
            login(request,user)
            return redirect('index')
    else:
        form = UserCreationForm()

    form = UserCreationForm()
    context = {'form' : form}
    return render(request, 'registration/register.html', context)

class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, *args, **kwargs):
        try:
            self.object = self.get_object()
        except Http404:
            self.object = None
        user = get_user_model().objects.get(email=self.object.email_address.email)
        redirect_url = reverse('user', args=(user.id,))
        return redirect(redirect_url)


class RegistrationView(APIView):
    
    def post(self, request):
        r = requests.post(f'{get_current_site(request)}/dj-rest-auth/registration/', data=request.POST)
        return HttpResponse(r.content)


class LoginView(APIView):
    
    def post(self, request):
        r = requests.post(f'{get_current_site(request)}/dj-rest-auth/login/', data=request.POST)
        return HttpResponse(r.content)

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        r = requests.post(f'{get_current_site(request)}/dj-rest-auth/logout/')
        return Response(r.content)


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        # return HttpResponse(json.dumps(content))
        return Response(content)


class ResetEmailView(APIView):
    def post(self, request):
        r = requests.post(f'{get_current_site(request)}/dj-rest-auth/password/reset/', data=request.POST)
        return Response(r.content)

class ConfirmView(APIView):
    def get(self, request, uidb64, token):
        data = {'uid': uidb64, "token": token}
        return Response(data)



class UserView(APIView):
    
    def post(self, request):
        r = requests.post(f'{get_current_site(request)}/dj-rest-auth/user/', data=request.POST)
        return Response(r.content)

    def get(self, request):
        r = requests.get(f'{get_current_site(request)}/dj-rest-auth/user/', data=request.GET)
        return Response(r.content)

class VerifyEmailView(APIView):
    def get(self, request, key):
        r = requests.post(f'{get_current_site(request)}/dj-rest-auth/registration/verify-email/', data={"key":key})
        return Response(r.content)