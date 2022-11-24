import { ThreeBody } from "@uiball/loaders";
import LoaderStyled from "./LoaderStyled";

const Loader = (): JSX.Element => {
  return (
    <LoaderStyled>
      <ThreeBody size={35} speed={1.1} color="black" />
    </LoaderStyled>
  );
};

export default Loader;
