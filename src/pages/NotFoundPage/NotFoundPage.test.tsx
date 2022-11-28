import { screen } from "@testing-library/react";
import mockStore from "../../mocks/store/mockStore";
import { UiState } from "../../redux/features/uiSlice/types";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import NotFoundPage from "./NotFoundPage";

describe("Given a not found page", () => {
  describe("When its rendered", () => {
    test("Then it should show a level 1 heading with the text 'Bloody Nose", () => {
      const title = "Bloody Nose";

      renderWithProviders(<NotFoundPage />);

      const heading = screen.queryByRole("heading", { name: title, level: 1 });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When is loading", () => {
    test("Then it should show a Loader component", () => {
      const mockUiPreloadedState: Partial<UiState> = {
        isLoading: true,
      };

      const store = mockStore({
        uiPreloadState: mockUiPreloadedState as UiState,
      });
      renderWithProviders(<NotFoundPage />, { store });

      const loader = screen.getByRole("alert");

      expect(loader).toBeInTheDocument();
    });
  });
});
