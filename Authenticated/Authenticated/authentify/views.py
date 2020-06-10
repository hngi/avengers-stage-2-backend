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
