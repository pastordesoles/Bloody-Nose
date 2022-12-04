import { useEffect } from "react";
import Header from "../../components/Header/Header";
import useSessions from "../../hooks/useSessions/useSessions";
import { useAppSelector } from "../../redux/hooks";
import SessionsDetailStyled from "./SessionDetailStyled";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router-dom";
import SessionCard from "../../components/SessionCard/SessionCard";
import StickyFooter from "../../components/Footer/Footer";

const SessionDetailPage = () => {
  const { loadOneSession } = useSessions();
  const { id } = useParams<"id">();
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const session = useAppSelector((state) => state.sessions.session);

  useEffect(() => {
    loadOneSession(id!);
  }, [id, loadOneSession]);

  return (
    <>
      <Header />
      <SessionsDetailStyled>
        {session && <SessionCard session={session} isDetail={true} />}
        {isLoading && <Loader />}
      </SessionsDetailStyled>
      <StickyFooter />
    </>
  );
};

export default SessionDetailPage;
