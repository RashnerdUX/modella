import { useState, useEffect } from 'react';

interface SocialSDKState {
  googleLoaded: boolean;
  facebookLoaded: boolean;
  googleError: string | null;
  facebookError: string | null;
}

export const useSocialSDK = () => {
  const [state, setState] = useState<SocialSDKState>({
    googleLoaded: false,
    facebookLoaded: false,
    googleError: null,
    facebookError: null,
  });

  useEffect(() => {
    let googleScript: HTMLScriptElement | null = null;
    let facebookScript: HTMLScriptElement | null = null;

    // Load Google Identity Services SDK
    const loadGoogleSDK = () => {
      // Check if already loaded
      if (window.google?.accounts) {
        setState(prev => ({ ...prev, googleLoaded: true }));
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="gsi/client"]');
      if (existingScript) {
        // Wait for existing script to load
        const checkGoogleLoaded = () => {
          if (window.google?.accounts) {
            setState(prev => ({ ...prev, googleLoaded: true }));
          } else {
            setTimeout(checkGoogleLoaded, 100);
          }
        };
        checkGoogleLoaded();
        return;
      }

      // Create and load the script
      googleScript = document.createElement('script');
      googleScript.src = 'https://accounts.google.com/gsi/client';
      googleScript.async = true;
      googleScript.defer = true;
      
      googleScript.onload = () => {
        // Wait for the API to initialize
        setTimeout(() => {
          if (window.google?.accounts) {
            setState(prev => ({ ...prev, googleLoaded: true }));
          } else {
            setState(prev => ({ 
              ...prev, 
              googleError: 'Google Identity Services failed to initialize' 
            }));
          }
        }, 100);
      };
      
      googleScript.onerror = () => {
        setState(prev => ({ 
          ...prev, 
          googleError: 'Failed to load Google Identity Services' 
        }));
      };

      document.head.appendChild(googleScript);
    };

    // Load Facebook SDK
    const loadFacebookSDK = () => {
      // Check if already loaded
      if (window.FB) {
        setState(prev => ({ ...prev, facebookLoaded: true }));
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="connect.facebook.net"]');
      if (existingScript) {
        // Wait for existing script to load
        const checkFacebookLoaded = () => {
          if (window.FB) {
            setState(prev => ({ ...prev, facebookLoaded: true }));
          } else {
            setTimeout(checkFacebookLoaded, 100);
          }
        };
        checkFacebookLoaded();
        return;
      }

      // Set up Facebook initialization
      (window as any).fbAsyncInit = () => {
        try {
          window.FB.init({
            appId: import.meta.env.VITE_FB_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v18.0'
          });
          setState(prev => ({ ...prev, facebookLoaded: true }));
        } catch (error) {
          setState(prev => ({ 
            ...prev, 
            facebookError: 'Facebook SDK initialization failed' 
          }));
        }
      };

      // Create and load the script
      facebookScript = document.createElement('script');
      facebookScript.src = 'https://connect.facebook.net/en_US/sdk.js';
      facebookScript.async = true;
      facebookScript.defer = true;
      facebookScript.crossOrigin = 'anonymous';
      
      facebookScript.onerror = () => {
        setState(prev => ({ 
          ...prev, 
          facebookError: 'Failed to load Facebook SDK' 
        }));
      };

      document.head.appendChild(facebookScript);
    };

    // Load both SDKs
    loadGoogleSDK();
    loadFacebookSDK();

    // Cleanup function
    return () => {
      if (googleScript && googleScript.parentNode) {
        googleScript.parentNode.removeChild(googleScript);
      }
      if (facebookScript && facebookScript.parentNode) {
        facebookScript.parentNode.removeChild(facebookScript);
      }
    };
  }, []);

  return {
    googleLoaded: state.googleLoaded,
    facebookLoaded: state.facebookLoaded,
    googleError: state.googleError,
    facebookError: state.facebookError,
    isLoading: !state.googleLoaded || !state.facebookLoaded,
    allLoaded: state.googleLoaded && state.facebookLoaded,
  };
};

// Type declarations for global objects
declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initCodeClient: (config: any) => any;
        };
      };
    };
    FB: {
      init: (config: any) => void;
      login: (callback: (response: any) => void, options?: any) => void;
    };
    fbAsyncInit: () => void;
  }
}
