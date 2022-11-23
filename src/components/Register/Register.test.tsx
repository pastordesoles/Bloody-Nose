import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../redux/store";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import Register from "./Register";

describe("Given the Register form component", () => {
  describe("When it's renderer", () => {
    test("Then it should show 4 text inputs: Username,Alias,Email,Password and button 'Sign up'", () => {
      const labelUsername = "username";
      const labelEmail = "email";
      const labelPassword = "password";
      const nameButton = "REGISTER";

      renderWithProviders(<Register />);

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
