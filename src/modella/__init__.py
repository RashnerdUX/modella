# This will make sure the Celery app is always imported when Django starts
# but only if Celery is available (not in serverless environments like Vercel)
try:
    from .celery import app as celery_app
    __all__ = ('celery_app',)
except ImportError:
    # Celery not available (e.g., in serverless environment)
    pass
