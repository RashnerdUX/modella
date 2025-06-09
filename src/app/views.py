from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView, DetailView
from django.views.generic.edit import FormView
from django.urls import reverse_lazy
from django.contrib import messages
from .forms import UserRegistrationForm, WardrobeItemForm
from .models import WardrobeItem
from django.db.models import Q

#for debugging
from django.conf import settings
from django.core.files.storage import default_storage

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
    # Get wardrobe stats for the user
    wardrobe_items = WardrobeItem.objects.filter(owner=request.user)
    context = {
        'total_items': wardrobe_items.count(),
        'total_outfits': 0,  # Placeholder until Outfit model is implemented
        'total_categories': wardrobe_items.values('category').distinct().count(),
        'total_favorites': wardrobe_items.filter(is_favorite=True).count()
    }
    return render(request, 'app/dashboard.html', context)

def privacypolicy(request):
    pass

def terms(request):
    pass

@login_required
def add_wardrobe_item(request):
    """Add a new wardrobe item."""
    if request.method == 'POST':
        form = WardrobeItemForm(request.POST, request.FILES, user=request.user)
        if form.is_valid():
            print(f"VIEW: settings.DEFAULT_FILE_STORAGE is: {settings.DEFAULT_FILE_STORAGE}")
            print(f"VIEW: default_storage object is: {default_storage}")
            item = form.save()
            if getattr(item, '_is_blurry', False):
                messages.warning(request, "The uploaded image appears to be blurry. Consider uploading a clearer photo.")
            messages.success(request, f'"{item.name}" has been added to your wardrobe!')
            return redirect('app:dashboard')
    else:
        form = WardrobeItemForm(user=request.user)
    
    return render(request, 'app/wardrobe_item_form.html', {'form': form})

@login_required
def wardrobe_list(request):
    """Display the user's wardrobe items with filtering."""
    items = WardrobeItem.objects.filter(owner=request.user)
    category_choices = WardrobeItem._meta.get_field('category').choices
    season_choices = WardrobeItem._meta.get_field('season').choices

    # Filtering
    category = request.GET.get('category')
    season = request.GET.get('season')
    brand = request.GET.get('brand')
    material = request.GET.get('material')
    style_tag = request.GET.get('style_tag')

    if category:
        items = items.filter(category=category)
    if season:
        items = items.filter(season=season)
    if brand:
        items = items.filter(brand__icontains=brand)
    if material:
        items = items.filter(material__icontains=material)
    if style_tag:
        items = items.filter(style_tags__icontains=style_tag)

    return render(request, 'app/wardrobe_list.html', {
        'items': items,
        'category_choices': category_choices,
        'season_choices': season_choices,
    })
