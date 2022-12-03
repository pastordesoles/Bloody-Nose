import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, SessionsState } from "./types";

const initialSessionsState: SessionsState = {
  sessions: [],
  session: {} as Session,
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState: initialSessionsState,
  reducers: {
    loadSessions: (currentSessionsState, action: PayloadAction<Session[]>) => ({
      ...currentSessionsState,
      sessions: [...action.payload],
    }),

    addSessions: (currentSessionsState, action: PayloadAction<Session[]>) => ({
      ...currentSessionsState,
      sessions: [...currentSessionsState.sessions, ...action.payload].filter(
        (session, index, self) =>
          self.findIndex((sessionIndex) => {
            return (
              sessionIndex.id === session.id && sessionIndex.id === session.id
            );
          }) === index
      ),
    }),

    loadOneSession: (currentSessionsState, action: PayloadAction<Session>) => ({
      ...currentSessionsState,
      session: { ...action.payload },
    }),

    deleteSession: (currentSessionsState, action: PayloadAction<string>) => ({
      ...currentSessionsState,
      sessions: currentSessionsState.sessions.filter(
        (session) => session.id !== action.payload
      ),
    }),
  },
});

export const {
  loadSessions: loadSessionsActionCreator,
  loadOneSession: loadOneSessionActionCreator,
  addSessions: addSessionsActionCreator,
  deleteSession: deleteSessionActionCreator,
} = sessionsSlice.actions;

export const sessionsReducer = sessionsSlice.reducer;
