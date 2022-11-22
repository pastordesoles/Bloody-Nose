import axios from "axios";
import { openModalActionCreator } from "../../redux/features/uiSlice/uiSlice";
import { useAppDispatch } from "../../redux/hooks";
import { UserRegisterCredentials } from "./types";
import userRoutes from "./userRoutes";

const apiUrl = process.env.REACT_APP_API_URL;
const { registerRoute, usersRoute } = userRoutes;

const useUser = () => {
  const dispatch = useAppDispatch();
  const registerUser = async (userData: UserRegisterCredentials) => {
    try {
      await axios.post(`${apiUrl}${usersRoute}${registerRoute}`, {
        username: userData.username,
        password: userData.password,
        email: userData.email,
      });

      dispatch(
        openModalActionCreator({
          isError: false,
          modalText: "User succesfully registered",
        })
      );
    } catch (error: unknown) {
      dispatch(
        openModalActionCreator({
          isError: false,
          modalText: "User already in the database",
        })
      );
    }
  };

  return { registerUser };
};

export default useUser;
