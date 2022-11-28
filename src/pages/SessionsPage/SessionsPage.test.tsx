import { screen } from "@testing-library/react";
import LoadMore from "../../components/LoadMore/LoadMore";
import mockSessionsState from "../../mocks/states/mockSessionsState";
import mockUiState from "../../mocks/states/mockUiState";
import { mockUserStateLogged } from "../../mocks/states/mockUserStates";
import mockStore from "../../mocks/store/mockStore";
import { UiState } from "../../redux/features/uiSlice/types";
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

  describe("When is loading", () => {
    test("Then it should show a Loader component", () => {
      const mockUiPreloadedState: Partial<UiState> = {
        isLoading: true,
        pagination: { currentPage: 0, totalPages: 0 },
      };

      const store = mockStore({
        uiPreloadState: mockUiPreloadedState as UiState,
      });
      renderWithProviders(<SessionsPage />, { store });

      const loader = screen.getByRole("alert");

      expect(loader).toBeInTheDocument();
    });
  });

  describe("When the current page is 0 and total pages is 0", () => {
    test("Then it should show a load more button", async () => {
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
