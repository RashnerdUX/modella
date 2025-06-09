from google import genai
import os
import dotenv
import django
import sys
import boto3
import requests
from google.genai import types
from pydantic import BaseModel

# Add the parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

dotenv.load_dotenv()

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# Import the WardrobeItem model
from app.models import WardrobeItem
from django.db import connection

def test_gemini_api():
    class ImageCaption(BaseModel):
        caption: str
    
    try:
        client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

        obj = WardrobeItem.objects.first()

        image_path = obj.image.url
        image_bytes = requests.get(image_path).content
        image = types.Part.from_bytes(
            data=image_bytes, mime_type="image/jpeg"
        )
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=[image, "Caption this image."],
            config={
                "response_schema": ImageCaption,
                "response_mime_type": "application/json",
            }
        )

        print("✅ Gemini API is connected successfully!")
        print("Here is the response from the Gemini API:")
        print(response.text)
        print("\n")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False
    finally:
        connection.close()

if __name__ == '__main__':
    test_gemini_api()