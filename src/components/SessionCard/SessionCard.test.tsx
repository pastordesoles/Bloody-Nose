import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import SessionCard from "./SessionCard";
import { getRandomSession } from "../../factories/sessionsFactory";

const session = getRandomSession();

describe("Given a SessionCard component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'Join!' button", () => {
      const nameButton = "Join!";

      renderWithProviders(<SessionCard session={session} />);

      const buttonJoin = screen.getByRole("button", {
        name: nameButton,
      });

      expect(buttonJoin).toBeInTheDocument();
    });
  });
});
