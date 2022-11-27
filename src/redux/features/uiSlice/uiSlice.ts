import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pagination, ShowModalActionPayload, UiState } from "./types";

const initialState: UiState = {
  isError: false,
  modalText: "",
  showModal: false,
  isLoading: false,
  pagination: {
    currentPage: 0,
    totalPages: 0,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    closeModalReducer: (previousUi: UiState) => ({
      ...previousUi,
      showModal: false,
    }),

    openModalReducer: (
      previousUi: UiState,
      action: PayloadAction<ShowModalActionPayload>
    ) => ({
      ...previousUi,
      showModal: true,
      isError: action.payload.isError,
      modalText: action.payload.modalText,
    }),

    showLoading: (currentUiState) => ({
      ...currentUiState,
      isLoading: true,
    }),

    hideLoading: (currentUiState) => ({
      ...currentUiState,
      isLoading: false,
    }),

    loadPages: (currentUiState, action: PayloadAction<Pagination>) => ({
      ...currentUiState,
      pagination: {
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      },
    }),
    advancePage: (currentUiState) => ({
      ...currentUiState,
      pagination: {
        ...currentUiState.pagination,
        currentPage: currentUiState.pagination.currentPage + 1,
      },
    }),
  },
});

export const uiReducer = uiSlice.reducer;

export const {
  openModalReducer: openModalActionCreator,
  closeModalReducer: closeModalActionCreator,
  showLoading: showLoadingActionCreator,
  hideLoading: hideLoadingActionCreator,
  loadPages: loadPagesActionCreator,
  advancePage: advancePageActionCreator,
} = uiSlice.actions;
