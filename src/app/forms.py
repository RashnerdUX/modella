from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import WardrobeItem

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user

class WardrobeItemForm(forms.ModelForm):
    class Meta:
        model = WardrobeItem
        fields = [
            'name',
            'category',
            'color',
            'image',
            'season',
            'brand',
            'material',
            'notes',
            'is_favorite'
        ]
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'E.g., Blue Cotton T-Shirt'
            }),
            'category': forms.Select(attrs={
                'class': 'form-select'
            }),
            'color': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'E.g., Navy Blue'
            }),
            'image': forms.FileInput(attrs={
                'class': 'form-control'
            }),
            'season': forms.Select(attrs={
                'class': 'form-select'
            }),
            'brand': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'E.g., Nike'
            }),
            'material': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'E.g., Cotton, Polyester'
            }),
            'notes': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Add any notes about care instructions, fit, or styling ideas...'
            }),
            'is_favorite': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            })
        }
        
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        if user:
            #Saves the user to the instance as the owner of item
            self.instance.owner = user 