import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import Login from "./Login";

const mockLogin = jest.fn();

jest.mock("../../hooks/useUser/useUser", () => {
  return () => ({
    loginUser: mockLogin,
  });
});

describe("Given a Login form component", () => {
  describe("When it's rendered", () => {
    test("Then it should show 2 text inputs: Username, Password and a 'SIGN IN' button", () => {
      const labelUsername = "username";
      const labelPassword = "password";
      const nameButton = "SIGN IN";

      renderWithProviders(<Login />);

      const buttonSignIn = screen.getByRole("button", {
        name: nameButton,
      });

      const inputUsername = screen.getByLabelText(labelUsername);
      const inputPassword = screen.getByLabelText(labelPassword);

      expect(buttonSignIn).toBeInTheDocument();
      expect(inputUsername).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
    });
  });

  describe("When its rendered and its 'SIGN IN' button is clicked", () => {
    test("Then the form should be submitted", async () => {
      renderWithProviders(<Login />);

      const username = screen.queryByRole("textbox", {
        name: "Username",
      }) as HTMLInputElement;
      const password = screen.queryByLabelText("password") as HTMLElement;
      await userEvent.type(username, "admin");
      await userEvent.type(password, "adminadmin");
      const button = screen.queryByRole("button")!;
      await userEvent.click(button);

      expect(mockLogin).toBeCalled();
    });
  });
});
