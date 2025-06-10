from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import WardrobeItem
from .tasks import process_wardrobe_image

@receiver(post_save, sender=WardrobeItem)
def wardrobe_item_post_save(sender, instance, created, **kwargs):
    if created:
        process_wardrobe_image.delay(instance.id) 