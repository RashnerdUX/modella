# Vercel Deployment Guide for Modella Django Project

This guide will help you deploy your Django project to Vercel.

## Prerequisites

1. Install Vercel CLI: `npm install -g vercel`
2. Create a Vercel account at [vercel.com](https://vercel.com)

## Environment Variables

You'll need to set the following environment variables in your Vercel project dashboard:

### Required Variables:
- `SECRET_KEY` - Your Django secret key
- `DATABASE_URL` - PostgreSQL database URL (recommended: Vercel Postgres)
- `DEBUG` - Set to `False` for production

### Optional Variables (if using S3):
- `USE_S3` - Set to `True` to enable S3 storage
- `AWS_ACCESS_KEY_ID` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
- `AWS_STORAGE_BUCKET_NAME` - Your S3 bucket name
- `AWS_S3_REGION_NAME` - Your S3 region

### Optional Variables (for email):
- `EMAIL_HOST_USER` - Your email for password reset functionality
- `EMAIL_HOST_PASSWORD` - Your email password

### Optional Variables (for AI features):
- `GEMINI_API_KEY` - Your Google Gemini API key

## Database Setup

Vercel functions are stateless, so you'll need an external database. Recommended options:

1. **Vercel Postgres** (Recommended):
   - Go to your Vercel project dashboard
   - Navigate to Storage tab
   - Create a new Postgres database
   - Copy the connection string to `DATABASE_URL`

2. **Supabase**:
   - Create a project at [supabase.com](https://supabase.com)
   - Get the PostgreSQL connection string
   - Set it as `DATABASE_URL`

3. **PlanetScale** or other cloud databases

## Deployment Steps

1. **Prepare your project:**
   ```bash
   # Make sure you're in the project root
   cd c:\Users\User\PycharmProjects\modella
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

4. **Set environment variables** in the Vercel dashboard under Settings > Environment Variables

5. **Run database migrations** (one-time setup):
   You'll need to run migrations manually since Vercel functions are stateless.
   You can do this by:
   - Temporarily adding a migration route to your Django app
   - Using a separate migration script
   - Or connecting to your database directly

## File Structure

- `vercel.json` - Vercel configuration
- `src/modella/settings_production.py` - Production-specific Django settings
- `.vercelignore` - Files to ignore during deployment
- `build.sh` - Build script (optional)

## Important Notes

1. **Static Files**: Configured to use WhiteNoise for serving static files
2. **Media Files**: For production, consider using S3 or similar cloud storage
3. **Database**: SQLite won't work in production; use PostgreSQL
4. **Celery**: Background tasks won't work on Vercel; consider alternatives like Vercel Functions or external services
5. **File Storage**: Local file storage is ephemeral on Vercel; use S3 for persistent storage

## Troubleshooting

1. **Build Issues**: Check the build logs in Vercel dashboard
2. **Database Connection**: Ensure your `DATABASE_URL` is correct
3. **Static Files**: Make sure `collectstatic` runs successfully
4. **Dependencies**: Ensure all packages in `requirements.txt` are installable

## Custom Domain

To use a custom domain:
1. Add your domain in Vercel project settings
2. Update `ALLOWED_HOSTS` in `settings_production.py`
3. Configure DNS records as instructed by Vercel

## Monitoring

Monitor your deployment through:
- Vercel Dashboard for function logs
- Your database provider's monitoring tools
- Consider setting up error tracking (Sentry, etc.)
