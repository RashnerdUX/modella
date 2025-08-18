import React from 'react'
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router';

export const FacebookLogin = () => {
  const { socialAuth } = useAuth();
  const navigate = useNavigate();

  // Function to handle Facebook login
  const handleFacebookLogin = () => {
    // Call Facebook login API
    FB.login(async response => {
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
    }, { scope: "public_profile,email" });
  };

  return (
    <div>
      {/* Facebook */}
        <button className="btn bg-[#1A77F2] text-white border-[#005fd8]" onClick={handleFacebookLogin}>
        <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
        Login with Facebook
        </button>
    </div>
  )
}

export const GoogleLogin = () => {
  const { socialAuth } = useAuth();
  const navigate = useNavigate();

  // Function to handle Google login
  const handleGoogleLogin = () => {
    // Call Google login API
    const provider = new (window as any).firebase.auth.GoogleAuthProvider();
    (window as any).firebase.auth().signInWithPopup(provider)
      .then(async (result: any) => {
        console.log("Logged in:", result.user.uid);
        // Send ID token to backend for verification and user sign up
        const token = await result.user.getIdToken();
        const success = await socialAuth('google', token);
        if (success) {
          console.log("Google login successful");
          navigate('/dashboard', { replace: true });
        } else {
          console.error("Error during Google login");
        }
      })
      .catch((error: any) => {
        console.error("Error during Google login:", error);
      });
  };

  return (
    <div>
      {/* Google */}
      <button className="btn bg-white text-black border-[#e5e5e5]" onClick={handleGoogleLogin}>
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
        Login with Google
      </button>
    </div>
  )
}