
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // Log authentication attempts for debugging
    if (!loading) {
      if (!user) {
        console.log('Authentication attempt failed: No user logged in');
      } else if (adminOnly && !isAdmin) {
        console.log('Admin access attempt failed:', user.email);
      }
    }
  }, [user, loading, adminOnly, isAdmin]);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 mx-auto bg-hotel-sand/50 rounded"></div>
          <div className="h-4 w-48 mx-auto bg-hotel-sand/30 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    toast.error('You must be logged in to access this page');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  if (adminOnly && !isAdmin) {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
