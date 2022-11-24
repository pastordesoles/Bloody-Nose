import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockInitialStore from "../../mocks/store/mockInitialStore";
import { closeModalActionCreator } from "../../redux/features/uiSlice/uiSlice";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import Toast from "./Toast";

beforeEach(() => {
  jest.clearAllMocks();
});

const dispatchSpy = jest.spyOn(mockInitialStore, "dispatch");

describe("Given a Toast component", () => {
  const feedbackBody = "Hello world";

  describe("When its rendered with the message 'Hello world' and severity 'success'", () => {
    test("Then it should show a Toast with the received information", () => {
      renderWithProviders(<Toast severity="success" message={feedbackBody} />);

      const toast = screen.queryByRole("alert");

      expect(toast).toBeInTheDocument();
    });
  });

  describe("When its close button is clicked", () => {
    test("Then dispatch should be called with closeModalActionCreator", async () => {
      renderWithProviders(<Toast severity="success" message={feedbackBody} />);

      const button = screen.queryByRole("button", { name: "Close" })!;
      await userEvent.click(button);

      expect(button).toBeInTheDocument();
    });
  });
});
