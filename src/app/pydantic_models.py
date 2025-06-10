from pydantic import BaseModel
from typing import Optional, List

class GeminiImageRequest(BaseModel):
    color: Optional[str] = None
    category: Optional[str] = None
    season: Optional[str] = None
    style_tags: Optional[List[str]] = None
    brand: Optional[str] = None
    material: Optional[str] = None
    prompt: Optional[str] = "Describe this wardrobe item and suggest style tags as JSON." 