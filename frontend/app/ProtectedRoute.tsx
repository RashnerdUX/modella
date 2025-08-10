import React from 'react';
import { useAuth } from './auth';

interface Props { children: React.ReactNode; }

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p className="p-4">Loading...</p>;
  if (!user && typeof window !== 'undefined') {
    window.location.href = '/login';
    return null;
  }
  return <>{children}</>;
};
