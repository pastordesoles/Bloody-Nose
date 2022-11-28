import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  isLogged: boolean;
}

const ProtectedRoute = ({ children, isLogged }: ProtectedRouteProps) => {
  if (isLogged) {
    return <Navigate to={"/sessions"} />;
  }
  return children;
};

export default ProtectedRoute;
