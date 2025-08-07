# Railway Deployment Guide for Modella

## Prerequisites
1. Create a Railway account at [railway.app](https://railway.app)
2. Install Railway CLI: `npm install -g @railway/cli`
3. Connect your GitHub repository to Railway

## Environment Variables to Set in Railway Dashboard

### Required:
```
SECRET_KEY=your-super-secret-django-key
DEBUG=False
ALLOWED_HOSTS=your-app-name.railway.app,localhost,127.0.0.1
DATABASE_URL=postgresql://user:pass@host:port/dbname (Auto-provided by Railway Postgres)
```

### Optional (for S3 storage):
```
USE_S3=True
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1
```

### Optional (for email):
```
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Optional (for Gemini AI):
```
GEMINI_API_KEY=your-gemini-api-key
```

### Optional (for Redis/Celery):
```
REDIS_URL=redis://redis:6379/0 (Auto-provided by Railway Redis)
```

## Deployment Steps

### Option 1: GitHub Integration (Recommended)
1. Go to Railway dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `wardrobe_planner` repository
5. Railway will auto-detect it's a Python project and deploy

### Option 2: Railway CLI
```bash
# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Option 3: Manual Upload
1. Zip your project folder
2. Go to Railway dashboard
3. Click "Deploy from template" > "Blank template"
4. Upload your zip file

## Add Database and Redis

### PostgreSQL Database:
1. In your Railway project dashboard
2. Click "Add service" > "Database" > "PostgreSQL"
3. Railway will automatically set DATABASE_URL environment variable

### Redis (for Celery):
1. Click "Add service" > "Database" > "Redis"
2. Railway will automatically set REDIS_URL environment variable

## Deploy Celery Worker (Optional)
1. In Railway project dashboard
2. Click "Add service" > "Empty service"
3. Connect same GitHub repo
4. Set start command to: `cd src && celery -A modella worker --loglevel=info`
5. Add same environment variables as main app

## Project Structure
```
modella/
├── Procfile                    # Process definitions
├── railway.json               # Railway configuration
├── nixpacks.toml              # Build configuration
├── requirements.txt           # Python dependencies
├── src/                       # Django source code
│   ├── manage.py
│   ├── modella/
│   └── app/
└── README.md
```

## Features Supported on Railway
✅ Full Django application
✅ Background tasks with Celery
✅ Redis for task queue
✅ PostgreSQL database
✅ Static file serving
✅ Media file uploads (use S3 for production)
✅ Environment-based configuration
✅ Auto-scaling
✅ Custom domains
✅ SSL certificates

## Post-Deployment
1. Your app will be available at `https://your-app-name.railway.app`
2. Admin interface: `https://your-app-name.railway.app/admin`
3. Create superuser: Use Railway shell or add a management command

## Troubleshooting
- Check logs in Railway dashboard
- Verify environment variables are set
- Ensure DATABASE_URL is configured
- Check that static files are being served correctly

## Cost
- Railway provides $5 free credit monthly
- Additional usage is pay-as-you-go
- Much more cost-effective than traditional hosting for small apps
