import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
