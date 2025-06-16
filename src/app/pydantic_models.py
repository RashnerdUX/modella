from pydantic import BaseModel, Field
from typing import Optional, List

class GeminiImageRequest(BaseModel):
    """
    This is used to request a JSON response from Gemini that contains metadata for wardrobe items
    """
    item_name: Optional[str] = None  # e.g. "hoodie", "t-shirt"
    color: Optional[str] = None
    category: Optional[str] = None  # e.g. "top", "bottom", "outerwear"
    layer: Optional[str] = None  # base, mid, outer
    pattern: Optional[str] = None  # e.g., floral, plain
    season: Optional[str] = None
    style_tags: Optional[List[str]] = None
    occasions: Optional[List[str]] = None
    brand: Optional[str] = None
    material: Optional[str] = None



class GeminiOutfitItem(BaseModel):
    item_name: str = Field(..., description="The name of the item provided in the prompt e.g 'Blue denim jacket'")
    id: int = Field(..., description="The id of the item provided in the prompt e.g 1")

class GeminiOutfitRecommendation(BaseModel):
    title: str = Field(..., description="A catchy short title for the outfit e.g 'Casual Summer Look'")  
    items: List[GeminiOutfitItem] = Field(..., description="A list of the items that make up the recommended outfit.")
    reasoning: Optional[str] = Field(..., description="The reasoning for the outfit provided in the prompt e.g 'The blue denim jacket and white t-shirt are a great combination for a casual summer look'")