import { screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import mockStore from "../../mocks/store/mockStore";
import { UiState } from "../../redux/features/uiSlice/types";
import { changeStyleActionCreator } from "../../redux/features/uiSlice/uiSlice";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import Filter from "./Filter";

const store = mockStore({
  uiPreloadState: {
    style: "all",
  } as UiState,
});
const mockDispatch = jest.spyOn(store, "dispatch");

describe("Given a Filter component", () => {
  describe("When the initial value 'all' is switched to 'karate'", () => {
    test("Then should call the dispatch with 'karate'", async () => {
      const newStyle = "Karate";
      const stylePayload = "karate";
      const expectedAction = changeStyleActionCreator(stylePayload);

      renderWithProviders(<Filter />, { store });

      const stylesSelect = screen.getByRole("button");

      await userEvent.click(stylesSelect);

      const styleChange = screen.getByRole("option", { name: newStyle });

      await userEvent.click(styleChange);

      expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });
});
