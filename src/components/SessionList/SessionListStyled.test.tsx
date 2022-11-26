import { screen } from "@testing-library/react";
import mockSessionsState from "../../mocks/states/mockSessionsState";
import mockUiState from "../../mocks/states/mockUiState";
import { mockUserStateLogged } from "../../mocks/states/mockUserStates";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import SessionList from "./SessionList";

describe("Given a SessionList component", () => {
  describe("When it's rendered", () => {
    test("Then it should show 10 'Join!' button", () => {
      const nameButton = "Join!";

      renderWithProviders(<SessionList />, {
        preloadedState: {
          sessions: mockSessionsState,
          ui: mockUiState,
          user: mockUserStateLogged,
        },
      });

      const buttonJoin = screen.queryAllByRole("button", {
        name: nameButton,
      });

      expect(buttonJoin).toHaveLength(10);
    });
  });
});
