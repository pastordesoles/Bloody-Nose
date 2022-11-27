export interface UiState {
  showModal: boolean;
  isError: boolean;
  modalText: string;
  isLoading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export interface ShowModalActionPayload {
  isError: boolean;
  modalText: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
}
