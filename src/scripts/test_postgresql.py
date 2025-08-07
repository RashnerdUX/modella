import os
import sys
import django
from django.db import connections
from django.db.utils import OperationalError
from dotenv import load_dotenv

# Add the parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load environment variables
load_dotenv()

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'modella.settings')
django.setup()

def test_postgresql_connection():
    try:
        # Try to get a cursor from the default database
        db_conn = connections['default']
        db_conn.cursor()
        
        # Get database info
        db_settings = db_conn.settings_dict
        print("\n✅ PostgreSQL Connection Test:")
        print(f"  - Database: {db_settings['NAME']}")
        print(f"  - Host: {db_settings['HOST']}")
        print(f"  - Port: {db_settings['PORT']}")
        print(f"  - User: {db_settings['USER']}")
        print("  - Status: Connected successfully!\n")
        return True
    except OperationalError as e:
        print("\n❌ PostgreSQL Connection Error:")
        print(f"  - Error: {str(e)}\n")
        return False

if __name__ == '__main__':
    test_postgresql_connection() 