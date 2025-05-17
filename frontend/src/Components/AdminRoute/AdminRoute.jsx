import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';

const AdminRoute = () => {
  const { isAuthenticated, currentUser } = useContext(AuthContext);
  return isAuthenticated && currentUser.role === 'Admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
