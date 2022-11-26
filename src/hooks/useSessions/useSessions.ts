import { useAppDispatch } from "../../redux/hooks";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { loadSessionsActionCreator } from "../../redux/features/sessionsSlice/sessionsSlice";
import {
  hideLoadingActionCreator,
  openModalActionCreator,
  showLoadingActionCreator,
} from "../../redux/features/uiSlice/uiSlice";
import sessionsRoutes from "./sessionsRoutes";
import getAllSessionsResponseBody from "./types";

import { Session } from "../../redux/features/sessionsSlice/types";

const apiUrl = process.env.REACT_APP_API_URL;
const { sessionsRoute, listRoute } = sessionsRoutes;

const useSessions = () => {
  const token = localStorage.getItem("token");
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
      const response = await axios.get<getAllSessionsResponseBody>(
        `${apiUrl}${sessionsRoute}${listRoute}`,
        authHeaders
      );

      const sessions = response.data.sessions.sessions;
      const sessionsList: Session[] = sessions;

      dispatch(loadSessionsActionCreator(sessionsList));
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
