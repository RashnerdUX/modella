# test_s3.py

import os
import boto3
from dotenv import load_dotenv
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import tempfile

# Load environment variables from .env file
load_dotenv()

def test_s3_connection():
    """Test basic S3 connectivity and bucket access."""
    s3 = boto3.client(
        's3',
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=os.getenv("AWS_S3_REGION_NAME")
    )

    bucket_name = os.getenv("AWS_STORAGE_BUCKET_NAME")

    try:
        response = s3.list_objects_v2(Bucket=bucket_name)
        print("✅ S3 bucket is connected successfully!")
        print("Here are the contents of the bucket:")
        if 'Contents' in response:
            for obj in response['Contents']:
                print(f"- {obj['Key']}")
            print("\n")
        else:
            print("Bucket is empty.")
        return True
    except Exception as e:
        print(f"❌ Failed to connect to S3: {e}")
        return False

def test_s3_write():
    """Test writing a file directly to S3 using boto3."""
    s3 = boto3.client(
        's3',
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=os.getenv("AWS_S3_REGION_NAME")
    )

    bucket_name = os.getenv("AWS_STORAGE_BUCKET_NAME")
    test_key = "test_files/test_write.txt"
    test_content = "This is a test file written directly to S3."

    try:
        s3.put_object(
            Bucket=bucket_name,
            Key=test_key,
            Body=test_content
        )
        print("✅ Successfully wrote test file directly to S3")
        
        # Verify the file exists
        response = s3.get_object(Bucket=bucket_name, Key=test_key)
        content = response['Body'].read().decode('utf-8')
        if content == test_content:
            print("✅ Successfully verified test file content")
        else:
            print("❌ Test file content verification failed")
        
        # Clean up
        s3.delete_object(Bucket=bucket_name, Key=test_key)
        print("✅ Cleaned up test file")
        return True
    except Exception as e:
        print(f"❌ Failed to write to S3: {e}")
        return False

def test_django_storage():
    """Test using Django's storage API to save and retrieve files."""
    test_path = "test_files/test_django_storage.txt"
    test_content = "This is a test file written using Django's storage API."

    try:
        settings.configure()
        # Save file using Django's storage
        default_storage.save(test_path, ContentFile(test_content))
        print("✅ Successfully saved file using Django's storage API")

        # Verify file exists
        if default_storage.exists(test_path):
            print("✅ Successfully verified file exists")

            # Read file content
            with default_storage.open(test_path, 'r') as f:
                content = f.read()
                if content == test_content:
                    print("✅ Successfully verified file content")
                else:
                    print("❌ File content verification failed")

        # Clean up
        default_storage.delete(test_path)
        print("✅ Cleaned up test file")
        return True
    except Exception as e:
        print(f"❌ Failed to use Django's storage API: {e}")
        return False

def test_image_upload():
    """Test uploading an image file using Django's storage API."""
    # Create a temporary image file
    with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as temp_file:
        temp_file.write(b'fake image data')
        temp_file_path = temp_file.name

    test_path = "test_files/test_image.jpg"

    try:
        # Save image using Django's storage
        with open(temp_file_path, 'rb') as f:
            default_storage.save(test_path, f)
        print("✅ Successfully saved image using Django's storage API")

        # Verify image exists
        if default_storage.exists(test_path):
            print("✅ Successfully verified image exists")

            # Get image URL
            url = default_storage.url(test_path)
            print(f"✅ Image URL: {url}")

        # Clean up
        default_storage.delete(test_path)
        os.unlink(temp_file_path)
        print("✅ Cleaned up test image")
        return True
    except Exception as e:
        print(f"❌ Failed to upload image: {e}")
        if os.path.exists(temp_file_path):
            os.unlink(temp_file_path)
        return False

if __name__ == '__main__':
    print("\n=== Testing S3 Connection ===")
    connection_ok = test_s3_connection()
    
    if connection_ok:
        print("\n=== Testing S3 Write ===")
        write_ok = test_s3_write()
        
        print("\n=== Testing Django Storage ===")
        storage_ok = test_django_storage()
        
        print("\n=== Testing Image Upload ===")
        image_ok = test_image_upload()
        
        print("\n=== Test Summary ===")
        print(f"S3 Connection: {'✅' if connection_ok else '❌'}")
        print(f"S3 Write: {'✅' if write_ok else '❌'}")
        print(f"Django Storage: {'✅' if storage_ok else '❌'}")
        print(f"Image Upload: {'✅' if image_ok else '❌'}")
    else:
        print("\n❌ Skipping further tests due to connection failure")