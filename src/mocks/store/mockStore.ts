import { configureStore } from "@reduxjs/toolkit";
import { sessionsReducer } from "../../redux/features/sessionsSlice/sessionsSlice";
import { SessionsState } from "../../redux/features/sessionsSlice/types";
import { UiState } from "../../redux/features/uiSlice/types";
import { uiReducer } from "../../redux/features/uiSlice/uiSlice";
import { UserState } from "../../redux/features/userSlice/types";
import { userReducer } from "../../redux/features/userSlice/userSlice";

interface MockStoreProps {
  uiPreloadState?: UiState;
  userPreloadState?: UserState;
  sessionsPreloadState?: SessionsState;
}

const mockStore = ({
  sessionsPreloadState,
  uiPreloadState,
  userPreloadState,
}: MockStoreProps = {}) =>
  configureStore({
    reducer: {
      ui: uiReducer,
      user: userReducer,
      sessions: sessionsReducer,
    },
    preloadedState: {
      ui: uiPreloadState,
      user: userPreloadState,
      sessions: sessionsPreloadState,
    },
  });

export default mockStore;
