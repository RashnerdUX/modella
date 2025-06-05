import os
import sys
import redis
from dotenv import load_dotenv

# Add the parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load environment variables
load_dotenv()

def test_redis_connection():
    redis_url = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    
    try:
        # Create Redis client
        redis_client = redis.from_url(redis_url)
        
        # Test connection by setting and getting a value
        redis_client.set('test_key', 'test_value')
        test_value = redis_client.get('test_key')
        redis_client.delete('test_key')
        
        if test_value.decode('utf-8') == 'test_value':
            print("\n✅ Redis Connection Test:")
            print(f"  - Redis URL: {redis_url}")
            print("  - Status: Connected successfully!")
            print("  - Test: Set/Get operation successful\n")
            return True
    except redis.ConnectionError as e:
        print("\n❌ Redis Connection Error:")
        print(f"  - Redis URL: {redis_url}")
        print(f"  - Error: {str(e)}\n")
        return False
    except Exception as e:
        print("\n❌ Redis Test Error:")
        print(f"  - Redis URL: {redis_url}")
        print(f"  - Error: {str(e)}\n")
        return False

if __name__ == '__main__':
    test_redis_connection() 