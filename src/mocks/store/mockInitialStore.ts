import { configureStore } from "@reduxjs/toolkit";
import { sessionsReducer } from "../../redux/features/sessionsSlice/sessionsSlice";
import { uiReducer } from "../../redux/features/uiSlice/uiSlice";
import { userReducer } from "../../redux/features/userSlice/userSlice";
import { store } from "../../redux/store";
import mockSessionsState from "../states/mockSessionsState";
import mockUiState from "../states/mockUiState";
import { mockUserStateNotLogged } from "../states/mockUserStates";

const mockInitialStore: typeof store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    sessions: sessionsReducer,
  },
  preloadedState: {
    user: mockUserStateNotLogged,
    ui: mockUiState,
    sessions: mockSessionsState,
  },
});

export default mockInitialStore;
