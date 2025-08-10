# Modella - Intelligent Fashion Stylist App

A modern web application that allows users to upload photos of their wardrobe and receive AI-powered outfit suggestions, style advice, and e-commerce recommendations.

## Architecture

**Backend:** Django REST API with cookie-based JWT authentication
**Frontend:** React SPA with TypeScript and Tailwind CSS
**AI:** Google Gemini for outfit analysis and recommendations
**Deployment:** Railway with PostgreSQL and Redis

## Features

- 🔐 Secure cookie-based authentication with auto-refresh
- 👗 Wardrobe management (upload, categorize, organize items)
- 🤖 AI-powered outfit recommendations using Gemini
- 📱 Responsive React frontend with modern UX
- 🛡️ Protected routes and centralized auth state
- ⚡ Background task processing with Celery
- 📊 REST API with comprehensive endpoints

## Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- Redis server
- PostgreSQL (for production)

### Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run migrations
python src/manage.py migrate

# Create superuser
python src/manage.py createsuperuser

# Start Django development server
python src/manage.py runserver

# Start Celery worker (separate terminal)
celery -A modella worker -l info
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/me/` - Get current user
- `POST /api/auth/refresh/` - Refresh JWT token

### Wardrobe & Outfits
- `GET/POST /api/wardrobe/` - List/create wardrobe items
- `GET/POST /api/outfits/` - List/create outfits
- `GET/POST /api/recommendations/` - List/save recommendations
- `POST /api/ai/recommend/` - Generate AI recommendations

## Development Workflow

1. **Backend Changes:** Edit Django code, run tests with `python manage.py test`
2. **Frontend Changes:** Edit React code, types auto-generated via `npm run typecheck`
3. **Database Changes:** Create migrations with `python manage.py makemigrations`
4. **API Testing:** Use Django admin or tools like Postman/curl
5. **Build Verification:** Run `npm run build` before deployment

## Tech Stack

See [TECH_STACK.md](TECH_STACK.md) for detailed technology information.

## Deployment Strategies

### Option 1: Monolithic Deployment (Recommended for MVP)
**Platform:** Railway
- Single service deployment
- Built-in PostgreSQL and Redis
- Automatic HTTPS and domain management
- Cost-effective for development and small-scale production

### Option 2: Separated Frontend/Backend
**Frontend:** Vercel or Netlify  
**Backend:** Railway
- Independent scaling and deployment
- Optimized frontend performance with CDN
- Preview deployments for feature branches
- Better suited for teams with frontend specialists

### Option 3: Multi-Service Architecture
**Services:** Railway multi-container or cloud provider
- Frontend, Backend, Worker, and Database as separate services
- Advanced monitoring and logging
- Horizontal scaling capabilities
- Enterprise-ready architecture

## Development Workflow

### Local Development
```bash
# Terminal 1: Backend
python src/manage.py runserver

# Terminal 2: Frontend  
cd frontend && npm run dev

# Terminal 3: Background Tasks
celery -A modella worker -l info
```

### Branch Strategy
- **main:** Production deployments
- **develop:** Staging environment
- **feature/*:** Preview deployments (automatic with Vercel/Netlify)

### Testing & Quality Assurance
```bash
# Backend tests
python src/manage.py test

# Frontend tests and type checking
cd frontend && npm run typecheck

# Build verification
cd frontend && npm run build
```

## License

MIT License - see LICENSE file for details.
