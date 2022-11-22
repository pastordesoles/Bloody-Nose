export interface UiState {
  showModal: boolean;
  isError: boolean;
  modalText: string;
}

export interface ShowModalActionPayload {
  isError: boolean;
  modalText: string;
}
