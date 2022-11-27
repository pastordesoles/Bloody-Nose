import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import mockInitialStore from "../../mocks/store/mockInitialStore";
import { store } from "../../redux/store";
import LoadMoreButton from "./LoadMore";
import { advancePageActionCreator } from "../../redux/features/uiSlice/uiSlice";
import { Provider } from "react-redux";

const dispatchSpy = jest.spyOn(store, "dispatch");

describe("Given the LoadMoreButton component", () => {
  describe("When it receives isLoading false", () => {
    test("Then it should display a load more button", () => {
      const pagination = { currentPage: 1, totalPages: 2 };

      const isLoading = false;

      renderWithProviders(
        <LoadMoreButton isLoading={isLoading} pagination={pagination} />
      );
      const loadMoreButton = screen.getByRole("button");

      expect(loadMoreButton).toBeInTheDocument();
    });

    describe("And the current page is not equal to the total available pages", () => {
      test("Then the load more button should be enabled", () => {
        const pagination = { currentPage: 1, totalPages: 2 };

        const isLoading = false;

        renderWithProviders(
          <LoadMoreButton isLoading={isLoading} pagination={pagination} />
        );
        const loadMoreButton = screen.getByRole("button");

        expect(loadMoreButton).toBeEnabled();
      });
    });
  });

  describe("When the button is clicked and the current page is 0 and total pages 0", () => {
    test("Then dispatch should not be called", async () => {
      const pagination = { currentPage: 0, totalPages: 0 };
      const isLoading = false;

      renderWithProviders(
        <LoadMoreButton isLoading={isLoading} pagination={pagination} />
      );
      const loadMoreButton = screen.getByRole("button");

      await userEvent.click(loadMoreButton);

      expect(dispatchSpy).not.toBeCalled();
    });
  });

  describe("When the load more button is clicked and current page is 0 and total pages 2", () => {
    test("Then dispatch should be called with action advance page", async () => {
      const pagination = { currentPage: 0, totalPages: 2 };
      const expectedAction = advancePageActionCreator();
      const isLoading = false;

      renderWithProviders(
        <LoadMoreButton isLoading={isLoading} pagination={pagination} />,
        { store }
      );

      const loadMoreButton = screen.getByRole("button");

      await userEvent.click(loadMoreButton);

      expect(dispatchSpy).toBeCalledWith(expectedAction);
    });
  });
});
