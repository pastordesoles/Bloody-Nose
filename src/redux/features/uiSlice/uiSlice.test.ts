import { UiState } from "./types";
import {
  closeModalActionCreator,
  hideLoadingActionCreator,
  openModalActionCreator,
  showLoadingActionCreator,
  uiReducer,
} from "./uiSlice";

describe("Given closeModalReducer", () => {
  describe("When it recieves an initial state with showModal true and a closeModalActionCreator'", () => {
    test("Then it should return a new state with with showModal false", () => {
      const mockUiState: UiState = {
        isError: false,
        modalText: "",
        showModal: true,
        isLoading: false,
        pagination: {
          currentPage: 0,
          totalPages: 0,
        },
      };

      const expectedUiState: UiState = {
        ...mockUiState,
        showModal: false,
      };

      const newUiState = uiReducer(mockUiState, closeModalActionCreator());

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });
});

describe("Given openModalReducer", () => {
  const mockUiState: UiState = {
    isError: false,
    modalText: "",
    showModal: false,
    isLoading: false,
    pagination: {
      currentPage: 0,
      totalPages: 0,
    },
  };

  describe("When it recieves an initial state and a payload isError true and the text 'Error'", () => {
    test("Then it should return a new state with the modal's isError true and modal text 'Error'", () => {
      const actionPayload = {
        isError: true,
        modalText: "Error",
      };
      const initialUiState: UiState = {
        ...mockUiState,
      };
      const expectedUiState: UiState = {
        showModal: true,
        modalText: actionPayload.modalText,
        isError: actionPayload.isError,
        isLoading: false,
        pagination: {
          currentPage: 0,
          totalPages: 0,
        },
      };

      const newUiState = uiReducer(
        initialUiState,
        openModalActionCreator(actionPayload)
      );

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });
});

describe("Given showLoading reducer", () => {
  const mockUiState: UiState = {
    isError: false,
    modalText: "",
    showModal: false,
    isLoading: false,
    pagination: {
      currentPage: 0,
      totalPages: 0,
    },
  };

  describe("When it recieves an initial state and isLoading true", () => {
    test("Then it should return a new state with the property isLoading to true", () => {
      const initialUiState: UiState = {
        ...mockUiState,
      };
      const expectedUiState: UiState = {
        showModal: false,
        modalText: "",
        isError: false,
        isLoading: true,
        pagination: {
          currentPage: 0,
          totalPages: 0,
        },
      };

      const newUiState = uiReducer(initialUiState, showLoadingActionCreator());

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });
});

describe("Given hideLoading reducer", () => {
  const mockUiState: UiState = {
    isError: false,
    modalText: "",
    showModal: false,
    isLoading: true,
    pagination: {
      currentPage: 0,
      totalPages: 0,
    },
  };

  describe("When it recieves an initial state and isLoading true", () => {
    test("Then it should return a new state with the property isLoading to false", () => {
      const initialUiState: UiState = {
        ...mockUiState,
      };
      const expectedUiState: UiState = {
        showModal: false,
        modalText: "",
        isError: false,
        isLoading: false,
        pagination: {
          currentPage: 0,
          totalPages: 0,
        },
      };

      const newUiState = uiReducer(initialUiState, hideLoadingActionCreator());

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });
});
