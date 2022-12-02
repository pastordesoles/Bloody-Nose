import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import SessionCard from "./SessionCard";
import { getRandomSession } from "../../factories/sessionsFactory";
import mockStore from "../../mocks/store/mockStore";
import { mockUserStateLogged } from "../../mocks/states/mockUserStates";

const mockDelete = jest.fn();

jest.mock("../../hooks/useSessions/useSessions", () => {
  return () => ({
    deleteOneSession: mockDelete,
  });
});

const session = getRandomSession();
session.owner = "1234";

describe("Given a SessionCard component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a 'Join!' button", () => {
      const nameButton = "Join!";

      renderWithProviders(<SessionCard session={session} isDetail={true} />);

      const buttonJoin = screen.getByRole("button", {
        name: nameButton,
      });

      expect(buttonJoin).toBeInTheDocument();
    });
  });

  describe("When it's rendered with a session that has the same id as the user", () => {
    test("Then it should show a delete icon button", async () => {
      const store = mockStore({ userPreloadState: mockUserStateLogged });
      const nameButton = "delete";

      renderWithProviders(<SessionCard session={session} isDetail={true} />, {
        store,
      });

      const buttonDelete = screen.getByRole("button", {
        name: nameButton,
      });

      await userEvent.click(buttonDelete);

      expect(mockDelete).toBeCalled();
    });
  });
});
