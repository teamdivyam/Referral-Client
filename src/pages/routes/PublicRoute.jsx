import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/loading';

const PublicRoute = ({ restricted = false }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <Loading />
  }
  
  // If route is restricted and user is authenticated, redirect to dashboard
  if (restricted && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Otherwise render the public route
  return <Outlet />;
};

export default PublicRoute;