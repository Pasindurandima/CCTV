import { Navigate } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and user doesn't have it, show unauthorized page
  if (requiredRole && user.role !== requiredRole) {
    return <Unauthorized />;
  }

  // User is authorized, render the protected content
  return children;
};

export default ProtectedRoute;
