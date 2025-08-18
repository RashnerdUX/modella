from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.conf import settings
from typing import Dict
import logging

logger = logging.getLogger(__name__)

User = get_user_model()

def register_for_social(email, username, provider) -> Dict[str, str]:
    """
    Used to create an account in our database 

    Args:
        email (str): The email provided by the social API
        username (str): The username provided by the social API
        provider (str): The social API used to register this user

    Returns:
        Dict[str, str]: Returns the new/existing user's email, username and generated JWT Tokens
    """

    #Find user in the database
    user = User.objects.filter(email=email).first()

    #If user exists, if not, create a new user
    if user:
        logger.info(f"User already exists - {user.email}")
        if user.auth_provider == provider:
            user = authenticate(email=email, password=settings.UNIVERSAL_PASSWORD)
            logger.info(f"User authenticated successfully - {user.email}")
            return {
                "email":user.email,
                "username": user.username,
                "auth_tokens": user.get_user_auth_token()
            }
        else:
            logger.info(f"User already exists with a different provider - {user.email} but user should log in with {user.auth_provider}")
            return {"message":f"User already created an account with a different provider. Please use {user.auth_provider} to login."}
    
    #Create and authenticate the user
    else:
        logger.info(f"Creating new user - {email}")
        new_user = User.objects.create_user(
            username=username,
            email=email,
            password=settings.UNIVERSAL_PASSWORD,
        )
        new_user.is_active = True
        new_user.auth_provider = provider
        new_user.save()
        logger.info(f"New user created - {new_user.email}")

        #Ensure user can be authenticated
        authenticated_new_user = authenticate(email=email, password=settings.UNIVERSAL_PASSWORD)
        logger.info(f"User authenticated successfully - {authenticated_new_user.email}")

        return {
            "email": authenticated_new_user.email,
            "username": authenticated_new_user.username,
            "auth_tokens": authenticated_new_user.get_user_auth_token()
        }
