import { Navigate, useLocation } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Routes
import routes from 'constants/routes';

export default function RequireAuth({ children }) {
  const { data } = useSelector((state) => state.user);

  const location = useLocation();

  if (!data) {
    return <Navigate to={routes.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}
