import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockInitialStore from "../../mocks/store/mockInitialStore";
import { closeModalActionCreator } from "../../redux/features/uiSlice/uiSlice";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import Toast from "./Toast";

beforeEach(() => {
  jest.clearAllMocks();
});

const mockDispatch = jest.fn();

jest.mock("../../redux/hooks", () => ({
  ...jest.requireActual("../../redux/hooks"),
  useAppDispatch: () => mockDispatch,
}));

jest.useFakeTimers();

describe("Given a Toast component", () => {
  const feedbackBody = "Hello world";

  describe("When its rendered with the message 'Hello world' and severity 'success'", () => {
    test("Then it should show a Toast with the received information", () => {
      renderWithProviders(
        <Toast severity="success" message={feedbackBody} isOpen={true} />
      );

      const toast = screen.queryByRole("alert");

      expect(toast).toBeInTheDocument();
    });
  });

  describe("When 4 seconds pass after it is rendered", () => {
    test("Then dispatch should be called with closeModalActionCreator", async () => {
      renderWithProviders(
        <Toast severity="success" message={feedbackBody} isOpen={true} />
      );

      const closeModalTime = 4000;
      jest.advanceTimersByTime(closeModalTime);

      expect(mockDispatch).toHaveBeenCalledWith(closeModalActionCreator());
    });
  });

  describe("When its rendered with the message 'Hello world'", () => {
    test("Then it should show a Toast with the received information", () => {
      renderWithProviders(
        <Toast severity="success" message={feedbackBody} isOpen={true} />
      );

      const toast = screen.queryByText(feedbackBody);

      expect(toast).toBeInTheDocument();
    });
  });
});
