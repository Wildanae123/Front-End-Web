// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Player } from '@lottiefiles/react-lottie-player'; // Or your preferred loading animation

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show a loading spinner or a minimal loading UI
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Player src="https://assets7.lottiefiles.com/packages/lf20_yy6zzg9v.json" loop autoplay style={{ width: '150px', height: '150px' }} />
      </div>
    );
  }

  if (!user) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is provided, check if the user's role is included
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User does not have the required role, redirect to an unauthorized page or home
    // For simplicity, redirecting to bookshelf, but an "Unauthorized" page is better.
    toast.error("You don't have permission to access this page.");
    return <Navigate to="/ghibli-food-bookshelf" replace />; 
  }

  return children; // User is authenticated (and has role if specified), render the child component
}

export default ProtectedRoute;