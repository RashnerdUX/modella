from django.contrib import admin
from .models import WardrobeItem, Outfit, Recommendation
from django.utils.html import format_html

@admin.register(WardrobeItem)
class WardrobeItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'category', 'color', 'season', 'date_added')
    list_filter = ('category', 'season', 'owner')
    search_fields = ('name', 'item_name', 'color', 'brand', 'owner__username')
    readonly_fields = ('item_name', 'style_tags', 'occasions', 'pattern', 'layer', 'image_preview')

    fieldsets = (
        ("User Input", {
            'fields': ('owner', 'name', 'category', 'color', 'season', 'brand', 'material', 'image', 'image_preview', 'linked_products', 'notes', 'is_favorite')
        }),
        ("AI Generated (Read Only)", {
            'fields': ('item_name', 'style_tags', 'layer', 'pattern', 'occasions'),
            'classes': ('collapse',),
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" style="object-fit: contain;" />', obj.image.url)
        return "No image"
    image_preview.short_description = 'Image Preview'


@admin.register(Outfit)
class OutfitAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'occasion', 'season', 'is_ai_generated', 'created_at')
    list_filter = ('season', 'is_ai_generated', 'user')
    search_fields = ('name', 'occasion', 'user__username')
    filter_horizontal = ('items',)


@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ('user', 'occasion', 'created_at')
    search_fields = ('user__username', 'text', 'occasion')
    filter_horizontal = ('items',)
