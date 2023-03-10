import StickyFooter from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";

import SessionForm from "../../components/SessionForm/SessionForm";
import { useAppSelector } from "../../redux/hooks";
import CreateSessionPageStyled from "./CreateSessionPageStyled";

const CreateSessionPage = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  return (
    <>
      <Header />

      <CreateSessionPageStyled>
        <SessionForm isUpdate={false} />
      </CreateSessionPageStyled>
      {isLoading && <Loader />}
      <StickyFooter />
    </>
  );
};

export default CreateSessionPage;
