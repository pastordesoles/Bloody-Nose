import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import SessionForm from "../../components/SessionForm/SessionForm";
import { useAppSelector } from "../../redux/hooks";
import UpdatePageStyled from "./UpdatePageStyled";

const UpdatePage = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading);

  return (
    <>
      <Header />
      <UpdatePageStyled>
        <SessionForm isUpdate={true} />
        {isLoading && <Loader />}
      </UpdatePageStyled>
    </>
  );
};

export default UpdatePage;
