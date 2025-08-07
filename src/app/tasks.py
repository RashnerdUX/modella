from datetime import datetime
from modella.celery import app
from celery import shared_task
from .models import WardrobeItem
from .pydantic_models import GeminiImageRequest
import requests
from google import genai
from google.genai import types
import dotenv
import os

dotenv.load_dotenv()

@app.task(name='app.tasks.test_connection')
def test_connection():
    return f"Test task executed at {datetime.now()}"

@shared_task
def process_wardrobe_image(wardrobe_item_id):
    #Initialize the GenAI client
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    # Fetch the clothing object
    item = WardrobeItem.objects.get(id=wardrobe_item_id)
    # Prepare image for Gemini 
    image_path = item.image.url
    image_bytes = requests.get(image_path).content   #get image   
    image = types.Part.from_bytes(
        data=image_bytes, mime_type="image/jpeg"
    )
    category_choices = [label for value, label in WardrobeItem._meta.get_field('category').choices]
    prompt = (
        f"Describe this wardrobe item and suggest style tags as JSON. "
        f"Choose the category from the following options: {category_choices}."
    )
    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents=[image, prompt],
        config={
            "response_schema": GeminiImageRequest,
            "response_mime_type": "application/json",
        }
    )
    # Parse the JSON response
    gemini_data = response.text

    # Update the WardrobeItem with non-null data from Gemini
    for field, value in gemini_data.items():
        if value is not None and value != "":
            setattr(item, field, value)

    # Save the updated item
    item.save()

    print(response.text)