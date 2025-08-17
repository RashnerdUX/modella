import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface User { id:number; username:string; email:string; }
interface AuthContextShape {
  user: User | null;
  loading: boolean; // true only while an explicit ensureUser() call is in-flight
  login: (username:string, password:string)=>Promise<boolean>;
  register: (data:{username:string; email:string; password:string})=>Promise<boolean>;
  logout: ()=>Promise<void>;
  authFetch: (input:RequestInfo, init?:RequestInit)=>Promise<Response>;
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
    const res = await fetch('/api/auth/me/', {credentials:'include'});
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      return true;
    } else {
      setUser(null);
      return false;
    }
  }, []);

  const scheduleRefresh = useCallback(() => {
    if (refreshTimer) window.clearTimeout(refreshTimer);
    const id = window.setTimeout(async () => {
      await fetch('/api/auth/refresh/', {method:'POST', credentials:'include'});
      scheduleRefresh();
    }, REFRESH_INTERVAL_MS);
    setRefreshTimer(id);
  }, [refreshTimer]);

  // Lazy user loading: do NOT fetch on mount. ProtectedRoute or callers invoke ensureUser().
  useEffect(() => {
    return () => { if (refreshTimer) window.clearTimeout(refreshTimer); };
  }, [refreshTimer]);

  const ensureUser = useCallback(async () => {
    if (user) return true; // already have
    if (loading) return !!user; // in progress
    setLoading(true);
    const ok = await fetchMe();
    if (ok) scheduleRefresh();
    setLoading(false);
    return ok;
  }, [user, loading, fetchMe, scheduleRefresh]);

  const login = useCallback(async (username:string, password:string) => {
    const res = await fetch('/api/auth/login/', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username,password}), credentials:'include'});
    if (!res.ok) return false;
    // login returns set-cookie with tokens, we then run fetchMe to populate context
    await fetchMe();
    scheduleRefresh();
    return true;
  }, [fetchMe, scheduleRefresh]);

  const register = useCallback(async (payload:{username:string; email:string; password:string}) => {
    console.log("Registering user");
    const res = await fetch('/api/auth/register/', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload), credentials:'include'});
    console.log("Register response", res);
    if (!res.ok) return false;
    await fetchMe();
    scheduleRefresh();
    return true;
  }, [fetchMe, scheduleRefresh]);

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout/', {method:'POST', credentials:'include'});
    setUser(null);
    if (refreshTimer) window.clearTimeout(refreshTimer);
  }, [refreshTimer]);

  const authFetch = useCallback(async (input:RequestInfo, init:RequestInit = {}) => {
    const res = await fetch(input, {credentials:'include', ...init});
    if (res.status === 401) {
      const refreshed = await fetch('/api/auth/refresh/', {method:'POST', credentials:'include'});
      if (refreshed.ok) {
        return fetch(input, {credentials:'include', ...init});
      }
    }
    return res;
  }, []);

  return (
    <AuthContext.Provider value={{user, loading, login, register, logout, authFetch, ensureUser}}>
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
