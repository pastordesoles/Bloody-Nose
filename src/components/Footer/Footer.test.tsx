import { screen } from "@testing-library/react";
import Footer from "./Footer";
import { renderWithProviders } from "../../test-utils/renderWithProviders";

describe("Given a Footer component", () => {
  describe("When it is rendered", () => {
    test("Then it should show a footer", () => {
      const title = "author";
      renderWithProviders(<Footer />);

      const heading = screen.getByRole("footer", { name: title });

      expect(heading).toBeInTheDocument();
    });
  });
});
