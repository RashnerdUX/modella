# test_s3.py

import os
import boto3
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the S3 client
def test_s3_connection():
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
        if 'Contents' in response:
            for obj in response['Contents']:
                print(f"- {obj['Key']}")
        else:
            print("Bucket is empty.")
    except Exception as e:
        print(f"❌ Failed to connect to S3: {e}")
        return False
    return True