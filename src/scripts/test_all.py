import test_postgresql
import test_redis
import test_celery
import test_s3

def run_all_tests():
    print("Running all service tests...\n")
    
    # Test PostgreSQL
    postgresql_ok = test_postgresql.test_postgresql_connection()
    
    # Test Redis
    redis_ok = test_redis.test_redis_connection()
    
    # Test Celery
    celery_ok = test_celery.test_celery_connection()

    # Test S3
    s3_ok = test_s3.test_s3_connection()
    
    # Print summary
    print("Test Summary:")
    print(f"  PostgreSQL: {'✅ OK' if postgresql_ok else '❌ Failed'}")
    print(f"  Redis:      {'✅ OK' if redis_ok else '❌ Failed'}")
    print(f"  Celery:     {'✅ OK' if celery_ok else '❌ Failed'}")
    print(f"  S3:         {'✅ OK' if s3_ok else '❌ Failed'}")
    print("")
    
    return all([postgresql_ok, redis_ok, celery_ok])

if __name__ == '__main__':
    run_all_tests() 