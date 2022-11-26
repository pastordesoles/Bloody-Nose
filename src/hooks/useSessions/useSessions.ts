import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { loadSessionsActionCreator } from "../../redux/features/sessionsSlice/sessionsSlice";
import {
  hideLoadingActionCreator,
  openModalActionCreator,
  showLoadingActionCreator,
} from "../../redux/features/uiSlice/uiSlice";
import { SessionsState } from "../../redux/features/sessionsSlice/types";
import sessionsRoutes from "./sessionsRoutes";

const apiUrl = process.env.REACT_APP_API_URL;
const { sessionsRoute, listRoute } = sessionsRoutes;

const useSessions = () => {
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const authHeaders = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  const loadAllsessions = useCallback(async () => {
    try {
      dispatch(showLoadingActionCreator());
      const response = await axios.get<SessionsState>(
        `${apiUrl}${sessionsRoute}${listRoute}`,
        authHeaders
      );

      const { sessions } = response.data;

      dispatch(loadSessionsActionCreator(sessions));
      dispatch(hideLoadingActionCreator());
    } catch (error: unknown) {
      dispatch(hideLoadingActionCreator());
      dispatch(
        openModalActionCreator({
          isError: true,
          modalText: "Error loading all sessions",
        })
      );
    }
  }, [dispatch, authHeaders]);

  return { loadAllsessions };
};

export default useSessions;
