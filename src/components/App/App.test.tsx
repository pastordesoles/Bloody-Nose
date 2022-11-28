import App from "./App";
import { MemoryRouter } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import mockInitialStore from "../../mocks/store/mockInitialStore";
import mockStore from "../../mocks/store/mockStore";
import {
  mockUserStateLogged,
  mockUserStateNotLogged,
} from "../../mocks/states/mockUserStates";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import { screen } from "@testing-library/react";

describe("Given an App component", () => {
  describe("When it's rendered with path '/*'", () => {
    test("Then it should render 'Register Page'", () => {
      const expectedApp = TestRenderer.create(
        <Provider store={mockInitialStore}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );

      expect(expectedApp).toMatchSnapshot();
    });
  });

  describe("When the user is logged and is currently in the login page", () => {
    test("Then it should be redirected to the sessions page", () => {
      const store = mockStore({ userPreloadState: mockUserStateLogged });
      const initialEntries = ["/sessions"];
      const title = "Bloody Nose";

      renderWithProviders(<App />, { store, initialEntries });

      const heading = screen.queryByRole("heading", { name: title, level: 1 });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the user is not logged and is currently in the login page", () => {
    test("Then it should be redirected to the sessions page", () => {
      const store = mockStore({ userPreloadState: mockUserStateNotLogged });
      const initialEntries = ["/sessions"];
      const nameButton = "REGISTER";

      renderWithProviders(<App />, { store, initialEntries });

      const buttonSignUp = screen.getByRole("button", {
        name: nameButton,
      });

      expect(buttonSignUp).toBeInTheDocument();
    });
  });

  describe("When the user is logged and goes to the register page", () => {
    test("Then it should be redirected to the sessions page", () => {
      const store = mockStore({ userPreloadState: mockUserStateLogged });
      const initialEntries = ["/"];
      const title = "Bloody Nose";

      renderWithProviders(<App />, { store, initialEntries });

      const heading = screen.queryByRole("heading", { name: title, level: 1 });

      expect(heading).toBeInTheDocument();
    });
  });
});
