import { Navigate } from "react-router-dom";

interface ExitRouteProps {
  children: JSX.Element;
  isLogged: boolean;
}

const ProtectedRoute = ({ children, isLogged }: ExitRouteProps) => {
  if (isLogged) {
    return <Navigate to={"/sessions"} />;
  }
  return children;
};

export default ProtectedRoute;
