import { screen } from "@testing-library/react";
import mockStore from "../../mocks/store/mockStore";
import { UiState } from "../../redux/features/uiSlice/types";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import LoginPage from "./LoginPage";

describe("Given a login page", () => {
  describe("When it's rendered", () => {
    test("Then it should show a register form with the label 'username', 'password' and a 'SIGN IN' button", () => {
      const labelUsername = "username";
      const labelPassword = "password";
      const nameButton = "SIGN IN";

      renderWithProviders(<LoginPage />);

      const buttonSignUp = screen.getByRole("button", {
        name: nameButton,
      });

      const inputUsername = screen.getByLabelText(labelUsername);
      const inputPassword = screen.getByLabelText(labelPassword);

      expect(buttonSignUp).toBeInTheDocument();
      expect(inputUsername).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
    });
  });

  describe("When is loading", () => {
    test("Then it should show a Loader component", () => {
      const mockUiPreloadedState: Partial<UiState> = {
        isLoading: true,
      };

      const store = mockStore({
        uiPreloadState: mockUiPreloadedState as UiState,
      });
      renderWithProviders(<LoginPage />, { store });

      const loader = screen.getByRole("alert");

      expect(loader).toBeInTheDocument();
    });
  });
});
