from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView, DetailView
from django.views.generic.edit import FormView
from django.urls import reverse_lazy
from django.contrib import messages
from .forms import UserRegistrationForm

def register(request):
    if request.method == "POST":
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('app:index')
    else:
        form = UserRegistrationForm()
    return render(request, 'registration/register.html', {'form': form})

def index(request):
    """Homepage view."""
    return render(request, 'app/index.html')

def about(request):
    """About page view."""
    return render(request, 'app/about.html')

def blog(request):
    """Blog listing page view."""
    # You might want to add blog post model and use ListView later
    return render(request, 'app/blog.html')

def contact(request):
    """Contact page view."""
    if request.method == 'POST':
        # Add contact form processing logic here
        messages.success(request, 'Thank you for your message! We will get back to you soon.')
    return render(request, 'app/contact.html')

@login_required
def dashboard(request):
    """User dashboard view."""
    return render(request, 'app/dashboard.html')

def privacypolicy(request):
    pass

def terms(request):
    pass
