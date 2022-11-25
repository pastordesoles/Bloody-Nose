import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { store, RootState } from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import { userReducer } from "../redux/features/userSlice/userSlice";
import { uiReducer } from "../redux/features/uiSlice/uiSlice";
import { sessionsReducer } from "../redux/features/sessionsSlice/sessionsSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { user: userReducer, ui: uiReducer, sessions: sessionsReducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <>
        <BrowserRouter>
          <Provider store={store}>{children}</Provider>
        </BrowserRouter>
      </>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
