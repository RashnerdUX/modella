from rest_framework_simplejwt.authentication import JWTAuthentication

class CookieJWTAuthentication(JWTAuthentication):
    """Authenticate by reading JWT access token from HttpOnly cookie 'access_token'."""
    def authenticate(self, request):
        raw_token = None
        if 'access_token' in request.COOKIES:
            raw_token = request.COOKIES.get('access_token')
        # Fallback to header for tools/tests
        if raw_token is None:
            header = self.get_header(request)
            if header is not None:
                raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None
        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token
