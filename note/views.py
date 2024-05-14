from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import Note


def loginPage(request):

    if request.user.is_authenticated:
        return redirect('homepage')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('homepage')  # Redirect to your desired page after login
        else:
            # Handle invalid login
            return render(request, 'note/login.html', {'error_message': 'invalid username or password!'})
        
    return render(request, 'note/login.html')

def registerPage(request):

    if request.user.is_authenticated:
        return redirect('homepage')

    # form = UserCreationForm()

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            # user = form.save()
            user = User.objects.create_user(
                username = form.cleaned_data['username'],
                password = form.cleaned_data['password1'],
                email = request.POST['email'],
                first_name = request.POST['first_name'],
                last_name = request.POST['last_name']
            )

            login(request, user)

            return redirect('homepage')

    return render(request, 'note/register.html')

def logout_view(request):
    logout(request)
    return redirect('login') 

#####################################

def homepage(request) :

    context = {}

    if request.user.is_authenticated : 
        notes = Note.objects.filter(user=request.user) 
        context['notes'] = notes

        if request.method == 'POST':
            if request.POST.get('save') == "true" :
                noteContent = request.POST.get('noteContent')
                noteId = request.POST.get('noteId')
                object_exists  = Note.objects.filter(id=noteId).exists()
                if object_exists:
                    print(f"updating note with Id = {noteId}")
                    note = Note.objects.get(id=noteId)
                    note.content = noteContent
                    note.save()
                    #print(f"note = {note}")
                else :
                    print(f"saving new note.")
                    note = Note()
                    note.content = noteContent
                    note.user = request.user
                    note.save()
                    # return redirect('homepage') 
                    

            if request.POST.get('delete') == "true":
                noteId = request.POST.get('noteId')
                print(f"deleting note with Id = {noteId}")
                note = Note.objects.get(id=noteId)
                note.delete()
            # return redirect('/')
        
    else :
        return redirect('login')
        
    return render(request, 'note/index.html', context)


def about(request):
    return render(request, 'note/about.html')

def custom_404(request, exception):
    return render(request, '404.html', status=404)

def custom_500(request):
    return render(request, '500.html', status=500)
