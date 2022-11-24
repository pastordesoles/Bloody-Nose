import { CircularProgress } from "@mui/material";
import LoaderStyled from "./LoaderStyled";

const Loader = (): JSX.Element => {
  return (
    <LoaderStyled role={"alert"}>
      <CircularProgress />
    </LoaderStyled>
  );
};

export default Loader;
