import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './auth';

interface Props { 
  children: React.ReactNode; 
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading, ensureUser } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!authChecked) {
        const isAuthenticated = await ensureUser();
        setAuthChecked(true);
        // You could also handle failed auth here if needed
      }
    };
    
    checkAuth();
  }, [ensureUser, authChecked]);

  // Checking authentication
  if (!authChecked || loading) {
    return <p className="p-4">Loading...</p>;
  }

  // Auth check complete - redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated
  return <>{children}</>;
};