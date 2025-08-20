import React, { useEffect, useState } from 'react'
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router';
import { useSocialSDK } from '../../hooks/useSocialSDK';

export const FacebookLogin = () => {
  const { socialAuth } = useAuth();
  const navigate = useNavigate();
  const { facebookLoaded, facebookError } = useSocialSDK();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle Facebook login
  const handleFacebookLogin = async () => {
    if (!facebookLoaded) {
      console.error("Facebook SDK not loaded yet");
      return;
    }

    if (facebookError) {
      console.error("Facebook SDK error:", facebookError);
      return;
    }

    setIsLoading(true);
    console.log("Facebook login clicked");
    
    try {
      // Call Facebook login API
      window.FB.login(async response => {
        if (response.authResponse && response.authResponse.accessToken) {
          console.log("Logged in:", response.authResponse.userID);
          // Use the socialAuth method from auth context
          const success = await socialAuth('facebook', response.authResponse.accessToken);
          if (success) {
            console.log("Facebook login successful");
            navigate('/dashboard', { replace: true });
          } else {
            console.error("Error during Facebook login");
          }
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
        setIsLoading(false);
      }, { scope: "public_profile,email" });
    } catch (error) {
      console.error("Facebook login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Facebook */}
        <button 
          className="btn bg-[#1A77F2] text-white border-[#005fd8] disabled:opacity-50" 
          onClick={handleFacebookLogin}
          disabled={!facebookLoaded || isLoading || !!facebookError}
        >
        <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
        {!facebookLoaded ? "Loading Facebook..." : 
         facebookError ? "Facebook Error" :
         isLoading ? "Signing in..." : "Login with Facebook"}
        </button>
    </div>
  )
}

export const GoogleLogin = () => {
  const { socialAuth } = useAuth();
  const navigate = useNavigate();
  const { googleLoaded, googleError } = useSocialSDK();
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    if (!googleLoaded) {
      console.error("Google Identity Services not loaded yet");
      return;
    }

    if (googleError) {
      console.error("Google SDK error:", googleError);
      return;
    }

    setIsLoading(true);
    console.log("Google login clicked");

    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    try {
      console.log("Google client ID:", GOOGLE_CLIENT_ID);
      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "openid profile email",
        ux_mode: "popup",
        callback: async (response: any) => {
          console.log("Google response:", response);
          console.log("Auth code:", response.code);

          const success = await socialAuth('google', response.code);
          if (success) {
            console.log("Google login successful");
            navigate('/dashboard', { replace: true });
          } else {
            console.error("Error during Google login");
          }
          setIsLoading(false);
        },
      });
      
      client.requestCode();
    } catch (error) {
      console.error("Google login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button 
        className="btn bg-white text-black border-[#e5e5e5] disabled:opacity-50" 
        onClick={handleGoogleLogin}
        disabled={!googleLoaded || isLoading || !!googleError}
      >
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g>
        </svg>
        {!googleLoaded ? "Loading Google..." : 
         googleError ? "Google Error" :
         isLoading ? "Signing in..." : "Login with Google"}
      </button>
    </div>
  );
};