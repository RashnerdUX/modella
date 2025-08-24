import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import apiClient from '../utils/axios';

interface User { id:number; username:string; email:string; }
interface AuthContextShape {
  user: User | null;
  loading: boolean; // true only while an explicit ensureUser() call is in-flight
  login: (username:string, password:string)=>Promise<boolean>;
  register: (data:{username:string; email:string; password:string})=>Promise<boolean>;
  socialAuth: (provider: 'facebook' | 'google', accessToken: string)=>Promise<boolean>;
  logout: ()=>Promise<void>;
  ensureUser: ()=>Promise<boolean>; // lazily fetch current user if not already loaded
}

// The box holding all information about the user and his authentication status
const AuthContext = createContext<AuthContextShape | undefined>(undefined);

const REFRESH_INTERVAL_MS = 1000 * 60 * 50; // 50 minutes for 60m access lifetime (adjust when Refresh token lifetime differs from 60m)

// The provider component that holds the authentication state and methods
// Technically the key that allows other members of the application to access the authentication state
export const AuthProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshTimer, setRefreshTimer] = useState<number | null>(null);

  const fetchMe = useCallback(async () => {
    try {
      const res = await apiClient.get('/api/auth/me/');
      setUser(res.data.user);
      return true;
    } catch (error) {
      setUser(null);
      return false;
    }
  }, []);

  const scheduleRefresh = useCallback(() => {
    if (refreshTimer) window.clearTimeout(refreshTimer);
    const id = window.setTimeout(async () => {
      try {
        await apiClient.post('/api/auth/refresh/');
        scheduleRefresh();
      } catch (error) {
        console.log('Token refresh failed during scheduled refresh');
      }
    }, REFRESH_INTERVAL_MS);
    setRefreshTimer(id);
  }, [refreshTimer]);

  // Lazy user loading: do NOT fetch on mount. ProtectedRoute or callers invoke ensureUser().
  useEffect(() => {
    return () => { if (refreshTimer) window.clearTimeout(refreshTimer); };
  }, [refreshTimer]);

  const ensureUser = useCallback(async () => {
    if (user) return true; // User information is available
    if (loading) return !!user; // User information is being loaded
    setLoading(true);
    const ok = await fetchMe();
    if (ok) scheduleRefresh();
    setLoading(false);
    return ok;
  }, [user, loading, fetchMe, scheduleRefresh]);

  const login = useCallback(async (username:string, password:string) => {
    console.log("Cookies before login:", document.cookie);
    try {
      const response = await apiClient.post('/api/auth/login/', { username, password });
      console.log("Login response status:", response.status);
      console.log("Response headers:", response.headers);
      
      // Check if Set-Cookie headers were sent
      const setCookieHeaders = response.headers['set-cookie'];
      console.log("Set-Cookie headers:", setCookieHeaders);
      
      console.log("Cookies after login:", document.cookie);
      
      // login returns set-cookie with tokens, we then run fetchMe to populate context
      await fetchMe();
      scheduleRefresh();
      return true;
    } catch (error) {
      return false;
    }
  }, [fetchMe, scheduleRefresh]);

  const register = useCallback(async (payload:{username:string; email:string; password:string}) => {
    try {
      console.log("Registering user");
      const res = await apiClient.post('/api/auth/register/', payload);
      console.log("Register response", res);
      await fetchMe();
      scheduleRefresh();
      return true;
    } catch (error) {
      return false;
    }
  }, [fetchMe, scheduleRefresh]);

  const socialAuth = useCallback(async (provider: 'facebook' | 'google', accessToken: string) => {
    try {
      console.log(`Social auth with ${provider}`);
      const res = await apiClient.post(`/api/auth/social/${provider}/`, { auth_token: accessToken });
      console.log("Social auth response", res);
      await fetchMe();
      scheduleRefresh();
      return true;
    } catch (error) {
      return false;
    }
  }, [fetchMe, scheduleRefresh]);

  const logout = useCallback(async () => {
    try {
      await apiClient.post('/api/auth/logout/');
    } catch (error) {
      console.log('Logout request failed, but clearing local state');
    }
    // This sets the user to a logged out state
    setUser(null);
    if (refreshTimer) window.clearTimeout(refreshTimer);
  }, [refreshTimer]);

  // To ensure I don't ship without protected routes in place
  useEffect(() => {
    // Auto-mock user in development when VITE_MOCK_AUTH is true
    if (import.meta.env.DEV && import.meta.env.VITE_MOCK_AUTH === 'true') {
      console.log("Mocking user in development");
      setUser({
        id: 1,
        username: "testuser",
        email: "test@example.com"
      });
      setLoading(false);
      return;
    }

  }, []);

  return (
    <AuthContext.Provider value={{user, loading, login, register, socialAuth, logout, ensureUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// Finally, the hook to access the authentication context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
