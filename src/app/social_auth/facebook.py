import facebook
import logging

logger = logging.getLogger(__name__)

def validate_facebook_token(token):
    try:
        # Verify the token with Facebook's API
        graph = facebook.GraphAPI(access_token=token)
        response = graph.get_object('me', fields='id,name,email,picture')
        # Verify that the response was gotten
        logger.info(f"Facebook token validated successfully: {response}")
        return response
    except facebook.GraphAPIError as e:
        logger.error(f"Facebook token validation error: {e}")
        return None