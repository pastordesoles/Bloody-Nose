import { Navigate } from "react-router-dom";

interface ExitRouteProps {
  children: JSX.Element;
  isLogged: boolean;
}
const ExitRoute = ({ children, isLogged }: ExitRouteProps): JSX.Element => {
  if (!isLogged) {
    return <Navigate to={"/"} />;
  }

  return children;
};
export default ExitRoute;
