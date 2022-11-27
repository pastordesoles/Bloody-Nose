import { screen } from "@testing-library/react";
import Header from "./Header";
import { renderWithProviders } from "../../test-utils/renderWithProviders";

describe("Given a Header component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a level 1 heading with the text 'Bloody Nose'", () => {
      const title = "Bloody Nose";
      renderWithProviders(<Header />);

      const heading = screen.getByRole("heading", { name: title, level: 1 });

      expect(heading).toBeInTheDocument();
    });
  });
});
