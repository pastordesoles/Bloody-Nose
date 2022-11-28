import Loader from "../../components/Loader/Loader";
import RegisterForm from "../../components/Register/Register";
import { useAppSelector } from "../../redux/hooks";
import RegisterPageStyled from "./RegisterPageStyled";

const RegisterPage = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  return (
    <RegisterPageStyled>
      <RegisterForm />
      {isLoading && <Loader />}
    </RegisterPageStyled>
  );
};

export default RegisterPage;
