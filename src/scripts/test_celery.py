import os
import sys
import django
from dotenv import load_dotenv

# Add the parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load environment variables
load_dotenv()

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# Import the Celery app and task
from core.celery import app
from app.tasks import test_connection

def test_celery_connection():
    try:
        # Try to execute the task
        result = test_connection.delay()
        
        try:
            # Wait for the task result with a timeout of 5 seconds
            task_result = result.get(timeout=5)
            print("\n✅ Celery Connection Test:")
            print(f"  - Broker URL: {app.conf.broker_url}")
            print(f"  - Backend URL: {app.conf.result_backend}")
            print("  - Status: Connected successfully!")
            print(f"  - Test Task Result: {task_result}\n")
            return True
        except Exception as e:
            print("\n❌ Celery Task Execution Error:")
            print(f"  - Broker URL: {app.conf.broker_url}")
            print(f"  - Backend URL: {app.conf.result_backend}")
            print(f"  - Error: {str(e)}")
            print("  - Note: Make sure Celery worker is running\n")
            return False
            
    except Exception as e:
        print("\n❌ Celery Configuration Error:")
        print(f"  - Error: {str(e)}\n")
        return False

if __name__ == '__main__':
    test_celery_connection() 