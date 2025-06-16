import os
import google.generativeai as genai
from .pydantic_models import GeminiOutfitRecommendation
from typing import List, Dict, Any
from django.conf import settings
import dotenv

dotenv.load_dotenv()
def get_outfit_recommendation(items: List[Dict[str, Any]], occasion: str):
    """
    Get an outfit recommendation from Gemini based on selected items and occasion.
    
    Args:
        items: List of wardrobe items with their details (JSON format)
        occasion: The occasion for the outfit
        
    Returns:
        str: Gemini's recommendation text
    """
    try:
        # Configure Gemini Client
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is not set")
        genai.configure(api_key=api_key)

        prompt = f"""As a fashion expert specialized in styling, analyze these clothing items and suggest an outfit for {occasion}.
        
        Items available: {items}

        Please explain why these items work well together and provide a reason for the outfit.

        Keep the response concise and friendly."""

        #Get the model
        model = genai.GenerativeModel('gemini-1.5-flash')

        #Specify the config
        generation_config = genai.GenerationConfig(
            temperature=0.6, 
            response_mime_type="application/json",
            response_schema=GeminiOutfitRecommendation
        )

        # Get the response
        response = model.generate_content(
            contents=[prompt],
            generation_config=generation_config
        )
        
        print(response.text)
        return response.text

    except Exception as e:
        # Log the error and return a fallback message
        print(f"Error getting Gemini recommendation: {str(e)}")
        return "I'm having trouble generating a recommendation right now. Please try again later."