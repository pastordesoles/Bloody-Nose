import decodeToken from "jwt-decode";
import { useCallback } from "react";
import { User } from "../../redux/features/userSlice/types";
import { loginUserActionCreator } from "../../redux/features/userSlice/userSlice";
import { useAppDispatch } from "../../redux/hooks";

const useToken = () => {
  const dispatch = useAppDispatch();

  const getToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const user: User = decodeToken(token);

      dispatch(loginUserActionCreator({ ...user, token }));
    }
  }, [dispatch]);
  return { getToken };
};

export default useToken;
