# Troubleshooting

## Dependencies Not Working
- Run test scripts with `py test_all.py`
- Review error messages and act accordingly

## Celery Not Processing Tasks
- Ensure Redis is running: `redis-server`
- Run Celery worker: `celery -A your_project worker --loglevel=info`

## Gemini API Errors
- Check API key validity
- Ensure prompt formatting is valid JSON

## Static/Media File Issues
- Check AWS S3/GCS permissions
- Ensure Django static/media settings are correct

## Deployment Errors
- Check Gunicorn/Nginx logs
- Verify environment variables and database config
