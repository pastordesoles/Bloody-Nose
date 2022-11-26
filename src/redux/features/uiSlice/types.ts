export interface UiState {
  showModal: boolean;
  isError: boolean;
  modalText: string;
  isLoading: boolean;
}

export interface ShowModalActionPayload {
  isError: boolean;
  modalText: string;
}
