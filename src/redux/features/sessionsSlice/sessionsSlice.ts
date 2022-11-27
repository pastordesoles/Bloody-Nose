import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, SessionsState } from "./types";

const initialSessionsState: SessionsState = {
  sessions: [],
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState: initialSessionsState,
  reducers: {
    loadSessions: (currentSessionsState, action: PayloadAction<Session[]>) => ({
      ...currentSessionsState,
      sessions: [...currentSessionsState.sessions, ...action.payload],
    }),
  },
});

export const { loadSessions: loadSessionsActionCreator } =
  sessionsSlice.actions;

export const sessionsReducer = sessionsSlice.reducer;
