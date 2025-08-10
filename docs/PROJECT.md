# Project Overview

**Goal:** Build a fashion stylist web application that uses AI to analyze wardrobe photos and offer outfit suggestions, styling tips, and product links.

## Architecture

**Backend:** Django REST API with cookie-based JWT authentication
- RESTful API endpoints for wardrobe, outfits, and recommendations
- Custom cookie-based JWT authentication system for security
- Celery + Redis for background AI processing tasks
- PostgreSQL database with S3 media storage

**Frontend:** React SPA with modern tooling
- React Router v7 for client-side routing
- TypeScript for type safety
- Tailwind CSS for responsive styling
- Cookie-based authentication flow with automatic refresh
- Protected routes and centralized auth context

##  Gemini Features Utilized
- **Image Understanding:** Analyze uploaded clothing items (type, color, pattern, style).
- **Text Generation:** Provide outfit descriptions, style advice, and occasion-based suggestions.
- **Image Generation:** (Future) Create AI-generated visuals of outfits.

## Project Phases
1. **Phase 1:** Wardrobe upload and text-based outfit suggestions.
2. **Phase 2:** Body type analysis, style preferences, and e-commerce recommendations.
3. **Phase 3:** Image generation, wardrobe photo parsing, and community features.

# Extra Notes
## Information Source
1. Take note. The categories for the warddrobe items are drawn from this link - [Garment Types](https://modaknits.com/garment-types-overview-of-garment-styles-and-categories/)
