from datetime import datetime
from core.celery import app

@app.task(name='app.tasks.test_connection')
def test_connection():
    return f"Test task executed at {datetime.now()}" 