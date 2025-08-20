from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
import logging
import requests as r

logger = logging.getLogger(__name__)

WEB_CLIENT_ID = settings.GOOGLE_CLIENT_ID
WEB_CLIENT_SECRET = settings.GOOGLE_CLIENT_SECRET
WEB_REDIRECT_URL = settings.GOOGLE_REDIRECT_URI

# (Receive token by HTTPS POST)
# ...

def exchange_code_for_tokens(code):
    """Exchange authorization code for access and refresh tokens.

    Args:
        code (_type_): _description_

    Returns:
        _type_: _description_
    """
    logger.info(code)
    token_url = "https://oauth2.googleapis.com/token"
    data = {
        "code": code,
        "client_id": WEB_CLIENT_ID,
        "client_secret": WEB_CLIENT_SECRET,
        "redirect_uri": "postmessage",
        "grant_type": "authorization_code",
    }
    response = r.post(token_url, data=data)
    logger.info(response.json().get("id_token"))
    return response.json()

def validate_google_token(token):
    """
    Used to verify Google ID Token

    Args:
        token: Google ID token

    Returns:
        Dict [str, str]:{
            iss (str): The link to the auth provider
            azp (str): The app identifier
            aud (str): The Google Client ID
            sub (str): Google User id
            at_hash (str): The hash
            name(str): Name of the Google user
            picture (url): Link to User's current profile picture
            given_name(str): User's first name
            family_name(str): User's last name
            iat (int): Expiry for access token
            exp(int): Expiry for the token 
        }
    """
    try:
        # Specify the WEB_CLIENT_ID of the app that accesses the backend:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), WEB_CLIENT_ID)

        if  idinfo['iss'] in ['accounts.google.com', 'https://accounts.google.com']:
            return idinfo
        
    except ValueError:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), WEB_CLIENT_ID)
        logger.info(f"Here's the value error: {idinfo}")
        # Invalid token
        return None
    
    except Exception as e:
        logger.error(f"Error authenticating token: {str(e)}")
        return {"error": f"There was an error authenticating the token - {str(e)}"}