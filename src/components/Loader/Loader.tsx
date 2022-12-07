import CircularProgress from "@mui/material/CircularProgress";
import LoaderStyled from "./LoaderStyled";

const Loader = (): JSX.Element => {
  return (
    <LoaderStyled role={"alert"}>
      <CircularProgress />
    </LoaderStyled>
  );
};

export default Loader;
