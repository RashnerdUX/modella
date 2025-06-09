from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class WardrobeItem(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wardrobe_items')
    name = models.CharField(max_length=100, help_text="E.g. White T-shirt, Denim Jacket")
    category = models.CharField(
        max_length=50,
        choices=[
            ('top', 'Top'),
            ('bottom', 'Bottom'),
            ('dress', 'Dress'),
            ('outerwear', 'Outerwear'),
            ('sportswear', 'Sportswear'),
            ('specialized', 'Specialized'),
            ('footwear', 'Footwear'),
            ('accessory', 'Accessory'),
            ('other', 'Other'),
        ]
    )
    color = models.CharField(max_length=30, help_text="E.g. Red, Black, Navy Blue")
    image = models.ImageField(upload_to='wardrobe/')
    season = models.CharField(
        max_length=20,
        choices=[
            ('summer', 'Summer'),
            ('winter', 'Winter'),
            ('spring', 'Spring'),
            ('autumn', 'Autumn'),
            ('all', 'All Season'),
        ],
        default='all'
    )
    style_tags = models.JSONField(blank=True, null=True, help_text="AI-generated tags like 'casual', 'formal', etc.")
    brand = models.CharField(max_length=50, blank=True, null=True)
    material = models.CharField(max_length=50, blank=True, null=True)
    linked_products = models.JSONField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    is_favorite = models.BooleanField(default=False)
    outfit_matches = models.ManyToManyField("Outfit", symmetrical=False, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.name} ({self.color})"

    def save(self, *args, **kwargs):
        # Only process if a new image is uploaded
        if self.image and hasattr(self.image, 'file'):
            img = Image.open(self.image)
            
            # --- EXIF Orientation ---
            try:
                for orientation in ExifTags.TAGS.keys():
                    if ExifTags.TAGS[orientation] == 'Orientation':
                        break
                exif = img._getexif()
                if exif is not None:
                    orientation_value = exif.get(orientation, None)
                    if orientation_value == 3:
                        img = img.rotate(180, expand=True)
                    elif orientation_value == 6:
                        img = img.rotate(270, expand=True)
                    elif orientation_value == 8:
                        img = img.rotate(90, expand=True)
            except Exception:
                pass  # If no EXIF, skip

            # --- Convert to RGB ---
            if img.mode != 'RGB':
                img = img.convert('RGB')

            # --- Resize ---
            img.thumbnail((768, 768), Image.LANCZOS)

            # --- Blurriness Detection ---
            img_gray = img.convert('L')
            arr = np.array(img_gray)
            laplacian_var = np.var(np.gradient(arr))
            # Threshold for blurriness (experimentally, <100 is quite blurry)
            self._is_blurry = laplacian_var < 100

            # --- Compress and Save ---
            buffer = BytesIO()
            img.save(buffer, format='JPEG', quality=85, optimize=True)
            buffer.seek(0)
            self.image.save(self.image.name, ContentFile(buffer.read()), save=False)
            super().save(*args, **kwargs)

class Outfit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, help_text="E.g. Casual Summer Look")
    items = models.ManyToManyField(WardrobeItem)
    occasion = models.CharField(max_length=100, blank=True, null=True)
    season = models.CharField(max_length=20, choices=[
        ('summer', 'Summer'),
        ('winter', 'Winter'),
        ('spring', 'Spring'),
        ('autumn', 'Autumn'),
        ('all', 'All Season'),
        ])
    is_ai_generated = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name or f"Outfit {self.id}"
