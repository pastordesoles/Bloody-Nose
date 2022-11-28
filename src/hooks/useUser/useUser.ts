import axios from "axios";
import decodeToken from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  hideLoadingActionCreator,
  openModalActionCreator,
  showLoadingActionCreator,
} from "../../redux/features/uiSlice/uiSlice";
import { User } from "../../redux/features/userSlice/types";
import {
  loginUserActionCreator,
  logoutUserActionCreator,
} from "../../redux/features/userSlice/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import {
  CustomTokenPayload,
  LoginResponse,
  UserCredentials,
  UserRegisterCredentials,
} from "./types";
import userRoutes from "./userRoutes";

const apiUrl = process.env.REACT_APP_API_URL;
const { registerRoute, usersRoute, loginRoute } = userRoutes;

const useUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerUser = async (userData: UserRegisterCredentials) => {
    try {
      dispatch(showLoadingActionCreator());
      await axios.post(`${apiUrl}${usersRoute}${registerRoute}`, {
        username: userData.username,
        password: userData.password,
        email: userData.email,
      });
      dispatch(hideLoadingActionCreator());
      dispatch(
        openModalActionCreator({
          isError: false,
          modalText: "User succesfully registered",
        })
      );
      navigate("/login");
    } catch (error: unknown) {
      dispatch(
        openModalActionCreator({
          isError: true,
          modalText: "Register error",
        })
      );
    }
  };

  const loginUser = async (user: UserCredentials) => {
    try {
      dispatch(showLoadingActionCreator());
      const login = await axios.post<LoginResponse>(
        `${apiUrl}${usersRoute}${loginRoute}`,
        {
          username: user.username,
          password: user.password,
        }
      );

      const { token } = login.data;

      const tokenPayload: CustomTokenPayload = decodeToken(token);

      const loggedUser: User = {
        ...tokenPayload,
        token,
      };

      dispatch(loginUserActionCreator(loggedUser));
      dispatch(hideLoadingActionCreator());
      dispatch(
        openModalActionCreator({
          isError: false,
          modalText: "Login succesful",
        })
      );
      localStorage.setItem("token", token);
      navigate("/sessions");
      return true;
    } catch (error: unknown) {
      dispatch(
        openModalActionCreator({
          isError: true,
          modalText: "Login error",
        })
      );
    }
  };

  const logoutUser = () => {
    localStorage.setItem("token", "");
    dispatch(logoutUserActionCreator());
    navigate("/");
  };

  return { registerUser, loginUser, logoutUser };
};

export default useUser;
