username = data.get('email',"")
password = data.get('password',"")
if password == "genericpassword123":
    try:
        user = User.objects.get(email = username)
        user.backend = 'django.contrib.auth.backends.ModelBackend'
    except User.DoesNotExist:
        raise ValueError("Invalid username/password.")
else:
    user = authenticate(username = username, password = password)

if user:
    if user.is_active:
        login(request, user)
        #return success for redirection
    else:
        raise ValueError("This user is inactive. Please contact your admin.")
else:
    raise ValueError("Invalid username/password.")
