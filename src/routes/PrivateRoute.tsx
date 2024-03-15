import { Navigate, Route, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, path }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;

  return isAuthenticated ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
