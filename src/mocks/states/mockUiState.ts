import { UiState } from "../../redux/features/uiSlice/types";

const mockUiState: UiState = {
  isLoading: false,
  isError: false,
  modalText: "",
  showModal: false,
  pagination: {
    currentPage: 0,
    totalPages: 0,
  },
};

export default mockUiState;
