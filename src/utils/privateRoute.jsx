import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
