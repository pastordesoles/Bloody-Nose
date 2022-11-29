import { useAppDispatch } from "../../redux/hooks";
import { useCallback, useMemo } from "react";
import axios from "axios";
import {
  addSessionsActionCreator,
  loadOneSessionActionCreator,
  loadSessionsActionCreator,
} from "../../redux/features/sessionsSlice/sessionsSlice";
import {
  hideLoadingActionCreator,
  loadPagesActionCreator,
  openModalActionCreator,
  showLoadingActionCreator,
} from "../../redux/features/uiSlice/uiSlice";
import sessionsRoutes from "./sessionsRoutes";
import GetAllSessionsResponseBody from "./types";

import { Session } from "../../redux/features/sessionsSlice/types";

const apiUrl = process.env.REACT_APP_API_URL;
const { sessionsRoute, listRoute, session: sessionEnd } = sessionsRoutes;

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

  const loadAllsessions = useCallback(
    async (page = 0, limit = 5) => {
      try {
        dispatch(showLoadingActionCreator());
        const response = await axios.get<GetAllSessionsResponseBody>(
          `${apiUrl}${sessionsRoute}${listRoute}`,
          {
            params: { page, limit },
            ...authHeaders,
          }
        );

        const { totalPages } = response.data.sessions;
        const currentPage = page;
        const sessions = response.data.sessions.sessions;
        const sessionsList: Session[] = sessions;

        dispatch(loadSessionsActionCreator(sessionsList));
        dispatch(loadPagesActionCreator({ totalPages, currentPage }));
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
    },
    [dispatch, authHeaders]
  );

  const loadOneSession = useCallback(
    async (id: string) => {
      try {
        dispatch(showLoadingActionCreator());
        const response = await axios.get(
          `${apiUrl}${sessionsRoute}${sessionEnd}${id}`,
          authHeaders
        );

        const { session } = await response.data;

        dispatch(loadOneSessionActionCreator({ ...session }));
        dispatch(hideLoadingActionCreator());
      } catch (error: unknown) {
        dispatch(hideLoadingActionCreator());
        dispatch(
          openModalActionCreator({
            isError: true,
            modalText: "Error loading a sessions",
          })
        );
      }
    },
    [authHeaders, dispatch]
  );

  const loadMoresessions = useCallback(
    async (page = 0, limit = 5) => {
      try {
        dispatch(showLoadingActionCreator());
        const response = await axios.get<GetAllSessionsResponseBody>(
          `${apiUrl}${sessionsRoute}${listRoute}`,
          {
            params: { page, limit },
            ...authHeaders,
          }
        );

        const { totalPages } = response.data.sessions;
        const currentPage = page;
        const sessions = response.data.sessions.sessions;
        const sessionsList: Session[] = sessions;

        dispatch(addSessionsActionCreator(sessionsList));
        dispatch(loadPagesActionCreator({ totalPages, currentPage }));
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
    },
    [dispatch, authHeaders]
  );

  return { loadAllsessions, loadOneSession, loadMoresessions };
};

export default useSessions;
