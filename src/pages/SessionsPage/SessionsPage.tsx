import { useEffect } from "react";
import Header from "../../components/Header/Header";
import SessionList from "../../components/SessionList/SessionList";
import useSessions from "../../hooks/useSessions/useSessions";
import SessionsPageStyled from "./SessionsPageStyled";

const SessionsPage = () => {
  const { loadAllsessions } = useSessions();

  useEffect(() => {
    loadAllsessions();
  }, [loadAllsessions]);
  return (
    <SessionsPageStyled>
      <Header />
      <SessionList />
    </SessionsPageStyled>
  );
};

export default SessionsPage;
