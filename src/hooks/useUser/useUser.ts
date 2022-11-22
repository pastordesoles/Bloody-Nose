import axios from "axios";
import { UserRegisterCredentials } from "./types";
import userRoutes from "./userRoutes";

const apiUrl = process.env.REACT_APP_API_URL;
const { registerRoute, usersRoute } = userRoutes;

const useUser = () => {
  const registerUser = async (userData: UserRegisterCredentials) => {
    await axios.post(`${apiUrl}${usersRoute}${registerRoute}`, {
      username: userData.username,
      password: userData.password,
      email: userData.email,
    });
  };

  return { registerUser };
};

export default useUser;
