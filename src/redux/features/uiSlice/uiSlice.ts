import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShowModalActionPayload, UiState } from "./types";

const initialState: UiState = {
  isError: false,
  modalText: "",
  showModal: false,
  isLoading: false,
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
  },
});

export const uiReducer = uiSlice.reducer;

export const {
  openModalReducer: openModalActionCreator,
  closeModalReducer: closeModalActionCreator,
  showLoading: showLoadingActionCreator,
  hideLoading: hideLoadingActionCreator,
} = uiSlice.actions;
