import { Navigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase';

const PrivateRoute = ({
  children 
}) => {
  // if (loading) return <Spinner />;
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="spinner">Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
