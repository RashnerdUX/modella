# Deployment Guide

## Local Development
- Use SQLite and local media storage
- Run Django with `python manage.py runserver`
- Celery with Redis in a separate terminal

## Production Setup
- Use PostgreSQL and AWS S3/GCS for storage
- Deploy with Gunicorn and Nginx
- Set up Celery worker and Redis on the server
- Secure all secrets using environment variables
- Use a platform like AWS/GCP/DigitalOcean
