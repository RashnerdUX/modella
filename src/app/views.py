from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView, DetailView
from django.views.generic.edit import FormView
from django.urls import reverse_lazy
from django.contrib import messages
from .forms import UserRegistrationForm, WardrobeItemForm, OutfitForm
from .models import WardrobeItem, Outfit, Recommendation
from django.db.models import Q
import json

#for debugging
from django.conf import settings
from django.core.files.storage import default_storage
from .helpers import get_outfit_recommendation

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

@login_required
def create_outfit(request):
    if request.method == 'POST':
        form = OutfitForm(request.POST)
        form.fields['items'].queryset = WardrobeItem.objects.filter(owner=request.user)
        if form.is_valid():
            # Get selected items and occasion
            items = form.cleaned_data['items']
            occasion = form.cleaned_data['occasion']
            
            # Prepare data for Gemini
            item_data = [{
                'id': item.id,
                'item_name': item.item_name,      
                'category': item.category,            
                'color': item.color,                  
                'pattern': item.pattern,              
                'material': item.material,           
                'season': item.season,                
                'style_tags': item.style_tags,        
                'brand': item.brand,              
                'occasions': item.occasions,          
                'layer': item.layer,                  
            } for item in items]
            
            # Get recommendation from Gemini
            gemini_text = get_outfit_recommendation(item_data, occasion)
            
            # Save Recommendation
            recommendation = Recommendation.objects.create(
                user=request.user,
                text=gemini_text,
                occasion=occasion
            )
            recommendation.items.set(items)
            recommendation.save()
            
            return redirect('app:recommendation_result', recommendation_id=recommendation.id)
    else:
        form = OutfitForm()
        form.fields['items'].queryset = WardrobeItem.objects.filter(owner=request.user)
    return render(request, 'app/create_outfit.html', {'form': form})

@login_required
def outfit_result(request, outfit_id=None, recommendation_id=None):
    # If POST, save the recommended outfit
    if request.method == 'POST' and recommendation_id:
        recommendation = get_object_or_404(Recommendation, id=recommendation_id, user=request.user)
        outfit = Outfit.objects.create(
            user=request.user,
            name=f"Outfit for {recommendation.occasion or 'Occasion'}",
            occasion=recommendation.occasion,
            season='all',  # You can improve this by letting user pick
            is_ai_generated=True
        )
        outfit.items.set(recommendation.items.all())
        outfit.save()
        messages.success(request, 'Outfit saved!')
        return redirect('app:outfit_result', outfit_id=outfit.id)
    
    # If GET with outfit_id, show the saved outfit
    if outfit_id:
        outfit = get_object_or_404(Outfit, id=outfit_id, user=request.user)
        return render(request, 'app/outfit_result.html', {'outfit': outfit, 'is_recommendation': False})
    
    # If GET with recommendation_id, show the recommendation
    if recommendation_id:
        recommendation = get_object_or_404(Recommendation, id=recommendation_id, user=request.user)
        wardrobe_items = recommendation.items.all()
        return render(request, 'app/outfit_result.html', {
            'recommendation': recommendation,
            'wardrobe_items': wardrobe_items,
            'is_recommendation': True
        })
    
    # Otherwise, show error
    messages.error(request, 'No recommendation to show.')
    return redirect('app:create_outfit')