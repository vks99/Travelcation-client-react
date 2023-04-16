import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext, { AuthContextType } from '../../context/AuthContext';
//when not login if direct to protect, will redirect to login page
const ProtectedRoute = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  if (!auth.isLoggedIn) {
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
