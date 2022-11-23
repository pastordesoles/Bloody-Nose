import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import Register from "./Register";

const mockLogin = jest.fn();

jest.mock("../../hooks/useUser/useUser", () => {
  return () => ({
    registerUser: mockLogin,
  });
});

describe("Given a Register form component", () => {
  describe("When it's rendered", () => {
    test("Then it should show 3 text inputs: Username, Email, Password and a 'REGISTER' button", () => {
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

  describe("When its rendered and its 'REGISTER' button is clicked", () => {
    test("Then the form should be submitted", async () => {
      renderWithProviders(<Register />);

      const username = screen.queryByLabelText("username") as HTMLElement;
      const password = screen.queryByLabelText("password") as HTMLElement;
      const email = screen.queryByLabelText("email") as HTMLElement;
      await userEvent.type(username, "admin");
      await userEvent.type(password, "adminadmin");
      await userEvent.type(email, "xav@i.com");
      const button = screen.queryByRole("button")!;
      await userEvent.click(button);

      expect(mockLogin).toHaveBeenCalled();
    });
  });
});
