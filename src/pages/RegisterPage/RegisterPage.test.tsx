import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import RegisterPage from "./RegisterPage";

describe("Given a register page", () => {
  describe("When it's rendered", () => {
    test("Then it should show the title 'Social' and a register form with the label 'username' and a 'Sign up' button", () => {
      const labelUsername = "username";
      const labelEmail = "email";
      const labelPassword = "password";
      const nameButton = "REGISTER";

      renderWithProviders(<RegisterPage />);

      const buttonSignUp = screen.getByRole("button", {
        name: nameButton,
      });

      const inputUsername = screen.getByLabelText(labelUsername);
      const inputEmail = screen.getByLabelText(labelEmail);
      const inputPassword = screen.getByLabelText(labelPassword);

      expect(buttonSignUp).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
      expect(inputUsername).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
    });
  });
});
