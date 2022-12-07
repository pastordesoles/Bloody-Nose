import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../redux/hooks";
import { Pagination } from "../../redux/features/uiSlice/types";
import { advancePageActionCreator } from "../../redux/features/uiSlice/uiSlice";
import Typography from "@mui/material/Typography";

interface LoadMoreProps {
  isLoading: boolean;
  pagination: Pagination;
}
const LoadMore = ({
  isLoading,
  pagination: { currentPage, totalPages },
}: LoadMoreProps) => {
  const dispatch = useAppDispatch();

  const disabledButton = currentPage === totalPages;

  const handleClick = () => {
    if (disabledButton) {
      return;
    }
    dispatch(advancePageActionCreator());
  };

  return (
    <LoadingButton
      loading={isLoading}
      variant="contained"
      size={"large"}
      sx={{ mt: 3, mb: 2 }}
      style={{ background: "#04395E", fontSize: "1,5rem" }}
      endIcon={<AddIcon />}
      loadingPosition="end"
      onClick={handleClick}
    >
      <Typography variant="button" fontWeight={600}>
        Load more
      </Typography>
    </LoadingButton>
  );
};

export default LoadMore;
