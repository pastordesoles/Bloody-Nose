import { screen } from "@testing-library/react";
import mockSessionsState from "../../mocks/states/mockSessionsState";
import mockUiState from "../../mocks/states/mockUiState";
import { mockUserStateLogged } from "../../mocks/states/mockUserStates";
import mockStore from "../../mocks/store/mockStore";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import Loader from "./Loader";

describe("Given a Loader component", () => {
  describe("When its rendered", () => {
    test("Then it should show an animation on the screen", () => {
      const store = mockStore({
        sessionsPreloadState: mockSessionsState,
        uiPreloadState: mockUiState,
        userPreloadState: mockUserStateLogged,
      });
      renderWithProviders(<Loader />, { store });

      const renderedAnimation = screen.queryByRole("alert");

      expect(renderedAnimation).toBeInTheDocument();
    });
  });
});
