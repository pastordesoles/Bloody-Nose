import { Pagination, UiState } from "./types";
import {
  advancePageActionCreator,
  changeStyleActionCreator,
  closeModalActionCreator,
  hideLoadingActionCreator,
  loadPagesActionCreator,
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
        style: "all",
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
    style: "all",
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
        style: "all",
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
    style: "all",
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
        style: "all",
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
    style: "all",
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
        style: "all",
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

describe("Given loadPages reducer", () => {
  describe("When it receives an action to load pages", () => {
    test("Then it should return the new state with pagination numbers", () => {
      const expectedPagination: Pagination = {
        currentPage: 1,
        totalPages: 2,
      };

      const initialState: Partial<UiState> = {
        pagination: {
          currentPage: 0,
          totalPages: 0,
        },
      };

      const action = loadPagesActionCreator(expectedPagination);

      const newState = uiReducer(initialState as UiState, action);

      expect(newState).toHaveProperty("pagination", expectedPagination);
    });
  });
});

describe("Given an advance pages reducer", () => {
  describe("When it receives an action to advance page", () => {
    test("Then should return the new state with the current page updated to 2", () => {
      const expectedPagination: Pagination = {
        currentPage: 2,
        totalPages: 2,
      };

      const initialState: Partial<UiState> = {
        pagination: {
          currentPage: 1,
          totalPages: 2,
        },
      };

      const action = advancePageActionCreator();

      const newState = uiReducer(initialState as UiState, action);

      expect(newState).toHaveProperty("pagination", expectedPagination);
    });
  });
});

describe("Given a changeStyle reducer", () => {
  describe("When it recieves an initial state with style 'all' and an action to change it to karate", () => {
    test("Then it should return a new state with with 'karate' as style", () => {
      const mockUiState: UiState = {
        isError: false,
        modalText: "",
        showModal: true,
        style: "all",
        isLoading: false,
        pagination: {
          currentPage: 0,
          totalPages: 0,
        },
      };

      const actionPayload = "karate";

      const expectedUiState: UiState = {
        ...mockUiState,
        style: "karate",
      };

      const newUiState = uiReducer(
        mockUiState,
        changeStyleActionCreator(actionPayload)
      );

      expect(newUiState).toStrictEqual(expectedUiState);
    });
  });
});
