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

## Railway Production Deployment

### Environment Variables
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

### Deployment Files
- **Procfile:** Defines web and worker processes
- **runtime.txt:** Specifies Python version
- **requirements.txt:** Python dependencies
- **build.sh:** Build script for frontend assets

### Railway Services
1. **Main App:** Django web server + static files
2. **PostgreSQL:** Managed database
3. **Redis:** Managed cache and message broker
4. **Worker:** Celery background tasks (optional separate service)

### Build Process
1. Frontend assets built during deployment
2. Django static files collected
3. Database migrations run automatically
4. Services start with defined Procfile commands

### Monitoring
- Railway provides logs and metrics
- Monitor Celery tasks via Django admin
- Set up error tracking (Sentry recommended)
