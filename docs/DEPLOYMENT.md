# Deployment Guide

## Local Development

### Backend Setup
1. Navigate to project root
2. Install Python dependencies: `pip install -r requirements.txt`
3. Configure environment variables (see `.env.example`)
4. Run migrations: `python src/manage.py migrate`
5. Create superuser: `python src/manage.py createsuperuser`
6. Start Django: `python src/manage.py runserver`
7. Start Celery worker: `celery -A modella worker -l info` (separate terminal)
8. Start Redis: `redis-server` (separate terminal or Docker)

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Build for production: `npm run build`

# Deployment Guide

## Local Development

### Backend Setup
1. Navigate to project root
2. Install Python dependencies: `pip install -r requirements.txt`
3. Configure environment variables (see `.env.example`)
4. Run migrations: `python src/manage.py migrate`
5. Create superuser: `python src/manage.py createsuperuser`
6. Start Django: `python src/manage.py runserver`
7. Start Celery worker: `celery -A modella worker -l info` (separate terminal)
8. Start Redis: `redis-server` (separate terminal or Docker)

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Build for production: `npm run build`

## Production Deployment Strategies

### Strategy 1: Monolithic Deployment (Railway)
Deploy both backend and frontend together on Railway.

#### Environment Variables
```
# Database
DATABASE_URL=postgresql://... (auto-provided by Railway)

# Redis
REDIS_URL=redis://... (auto-provided by Railway)

# Django
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.railway.app
CSRF_TRUSTED_ORIGINS=https://your-domain.railway.app
CORS_ALLOWED_ORIGINS=https://your-domain.railway.app

# AWS S3 (optional)
USE_S3=True
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_STORAGE_BUCKET_NAME=your-bucket

# AI
GEMINI_API_KEY=your-gemini-key
```

#### Railway Services
1. **Main App:** Django web server + static files
2. **PostgreSQL:** Managed database
3. **Redis:** Managed cache and message broker
4. **Worker:** Celery background tasks (optional separate service)

### Strategy 2: Separated Frontend/Backend Deployment

#### Backend: Railway
```
# Same environment variables as Strategy 1, but update CORS/CSRF for frontend domain:
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://your-frontend-domain.netlify.app
CSRF_TRUSTED_ORIGINS=https://your-frontend-domain.vercel.app,https://your-frontend-domain.netlify.app
```

#### Frontend Option A: Vercel Deployment

**Configuration Files:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Environment Variables (Vercel Dashboard):**
```
VITE_API_BASE_URL=https://your-backend.railway.app
```

**Deployment Commands:**
```bash
npm install -g vercel
vercel --prod
```

#### Frontend Option B: Netlify Deployment

**Configuration Files:**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Environment Variables (Netlify Dashboard):**
```
VITE_API_BASE_URL=https://your-backend.railway.app
```

**Deployment Commands:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Strategy 3: Multi-Service Railway Deployment
Deploy frontend and backend as separate Railway services for better scaling.

#### Backend Service (same as Strategy 1)
#### Frontend Service
```
# Environment Variables
VITE_API_BASE_URL=https://your-backend-service.railway.app

# Dockerfile (optional)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

## Development Workflow Considerations

### Branch-Based Deployments
- **Main Branch:** Production deployment (Railway/Vercel/Netlify)
- **Develop Branch:** Staging environment
- **Feature Branches:** Preview deployments (Vercel/Netlify automatic)

### Environment Management
```bash
# Development
VITE_API_BASE_URL=http://localhost:8000

# Staging
VITE_API_BASE_URL=https://staging-backend.railway.app

# Production
VITE_API_BASE_URL=https://api.modella.app
```

### CI/CD Pipeline Suggestions
1. **GitHub Actions** for automated testing
2. **Vercel/Netlify** automatic deployments from Git
3. **Railway** automatic deployments with build hooks
4. **Separate repos** for independent frontend/backend deployments

## Monitoring & Maintenance

### Railway Services
- Railway provides logs and metrics
- Monitor Celery tasks via Django admin
- Database connection pooling for production

### Frontend CDN Services
- **Vercel:** Built-in analytics and performance monitoring
- **Netlify:** Form handling, edge functions, A/B testing
- **Custom monitoring:** Google Analytics, Sentry for error tracking

### Security Considerations
- HTTPS enforced on all platforms
- CORS configured for specific domains
- Cookie settings: `SameSite=Lax`, `Secure=True` in production
- Environment secrets properly configured per platform
