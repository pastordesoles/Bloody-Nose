import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../../redux/features/userSlice/userSlice";
import { store } from "../../redux/store";
import { mockUserStateNotLogged } from "../states/mockUserStates";

const mockInitialStore: typeof store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: mockUserStateNotLogged,
  },
});

export default mockInitialStore;
