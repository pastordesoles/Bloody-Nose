import { screen } from "@testing-library/react";
import LoadMore from "../../components/LoadMore/LoadMore";
import mockSessionsState from "../../mocks/states/mockSessionsState";
import mockUiState from "../../mocks/states/mockUiState";
import { mockUserStateLogged } from "../../mocks/states/mockUserStates";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import SessionsPage from "./SessionsPage";

describe("Given a Sessions page", () => {
  describe("When it's rendered", () => {
    test("Then it should show 10 'Join!' button", () => {
      const nameButton = "Join!";

      renderWithProviders(<SessionsPage />, {
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

  describe("When", () => {
    test("Then", async () => {
      const pagination = { currentPage: 0, totalPages: 0 };
      const isLoading = false;

      renderWithProviders(
        <LoadMore isLoading={isLoading} pagination={pagination} />
      );
      const loadMoreButton = screen.getByRole("button");

      expect(loadMoreButton).toBeInTheDocument();
    });
  });
});
