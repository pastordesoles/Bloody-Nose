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
import { screen, waitFor } from "@testing-library/react";
import { UiState } from "../../redux/features/uiSlice/types";

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
    test("Then it should be redirected to the sessions page", async () => {
      const store = mockStore({ userPreloadState: mockUserStateLogged });
      const initialEntries = ["/sessions"];
      const title = "Bloody Nose";

      renderWithProviders(<App />, { store, initialEntries });

      await waitFor(() => {
        const heading = screen.queryByRole("heading", {
          name: title,
          level: 1,
        });
        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the user is logged", () => {
    test("Then it should be redirected to the sessions detail page", async () => {
      const store = mockStore({ userPreloadState: mockUserStateLogged });
      const initialEntries = ["/session/:id"];
      const title = "Bloody Nose";

      renderWithProviders(<App />, { store, initialEntries });

      await waitFor(() => {
        const heading = screen.queryByRole("heading", {
          name: title,
          level: 1,
        });
        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the user is logged and goes to an inexistent page", () => {
    test("Then it should be redirected to the not found page", async () => {
      const store = mockStore({ userPreloadState: mockUserStateLogged });
      const initialEntries = ["/ajwirjiew"];
      const title = "Bloody Nose";

      renderWithProviders(<App />, { store, initialEntries });

      await waitFor(() => {
        const heading = screen.queryByRole("heading", {
          name: title,
          level: 1,
        });
        expect(heading).toBeInTheDocument();
      });
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

  describe("When there is a success modal", () => {
    test("Then it should show a success modal", () => {
      const mockUiPreloadedState: Partial<UiState> = {
        showModal: true,
        isError: false,
      };

      const store = mockStore({
        uiPreloadState: mockUiPreloadedState as UiState,
      });
      renderWithProviders(<App />, { store });

      const toast = screen.queryByRole("alert");

      expect(toast).toBeInTheDocument();
    });
  });

  describe("When there is an error modal", () => {
    test("Then it should show an error modal", () => {
      const mockUiPreloadedState: Partial<UiState> = {
        showModal: true,
        isError: true,
      };

      const store = mockStore({
        uiPreloadState: mockUiPreloadedState as UiState,
      });
      renderWithProviders(<App />, { store });

      const toast = screen.queryByRole("alert");

      expect(toast).toBeInTheDocument();
    });
  });

  // describe("When the user is logged and goes to the create page", () => {
  //   test("Then it should be redirected to the create page", async () => {
  //     const store = mockStore({ userPreloadState: mockUserStateLogged });
  //     const initialEntries = ["/create"];
  //     const title = "Bloody Nose";

  //     renderWithProviders(<App />, { store, initialEntries });

  //     await waitFor(() => {
  //       const heading = screen.queryByRole("heading", {
  //         name: title,
  //         level: 1,
  //       });
  //       expect(heading).toBeInTheDocument();
  //     });
  //   });
  // });

  describe("When the user is logged and goes to the edit page", () => {
    test("Then it should be redirected to the edit page", async () => {
      const store = mockStore({ userPreloadState: mockUserStateLogged });
      const initialEntries = ["/edit/:id"];
      const title = "Bloody Nose";

      renderWithProviders(<App />, { store, initialEntries });

      await waitFor(() => {
        const heading = screen.queryByRole("heading", {
          name: title,
          level: 1,
        });
        expect(heading).toBeInTheDocument();
      });
    });
  });
});
