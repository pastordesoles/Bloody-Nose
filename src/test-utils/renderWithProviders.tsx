import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { InitialEntry } from "@remix-run/router";
import { Provider } from "react-redux";
import { store, RootState } from "../redux/store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { userReducer } from "../redux/features/userSlice/userSlice";
import { uiReducer } from "../redux/features/uiSlice/uiSlice";
import { sessionsReducer } from "../redux/features/sessionsSlice/sessionsSlice";

interface ExtendedPropsWithChildren extends PropsWithChildren {
  initialEntries?: InitialEntry[];
}

interface ExtendedRenderOptions
  extends Omit<RenderOptions, "queries">,
    ExtendedPropsWithChildren {
  preloadedState?: PreloadedState<RootState>;
  store?: typeof store;
}

const Router = ({
  children,
  initialEntries,
}: ExtendedPropsWithChildren): JSX.Element => {
  return initialEntries ? (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  );
};

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState,
    initialEntries,
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
        <Router initialEntries={initialEntries}>
          <Provider store={store}>{children}</Provider>
        </Router>
      </>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
