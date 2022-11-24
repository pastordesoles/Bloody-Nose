import { render, screen } from "@testing-library/react";
import FormButton from "./FormButton";

describe("Given the Primary Button component", () => {
  describe("When it's rendered with the text 'Hello'", () => {
    test("Then it should show the button with the received text", () => {
      const expectedText = "Hello";

      render(<FormButton message={expectedText} />);

      const button = screen.getByRole("button", { name: expectedText });

      expect(button).toBeInTheDocument();
    });
  });
});
