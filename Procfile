web: cd src && python manage.py migrate && python manage.py collectstatic --noinput && gunicorn modella.wsgi:application --bind 0.0.0.0:$PORT
worker: cd src && celery -A modella worker --loglevel=info
