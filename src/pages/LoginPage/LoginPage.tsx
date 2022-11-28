import Loader from "../../components/Loader/Loader";
import LoginForm from "../../components/Login/Login";
import { useAppSelector } from "../../redux/hooks";
import LoginPageStyled from "./LoginPageStyled";

const LoginPage = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  return (
    <LoginPageStyled>
      <LoginForm />
      {isLoading && <Loader />}
    </LoginPageStyled>
  );
};

export default LoginPage;
