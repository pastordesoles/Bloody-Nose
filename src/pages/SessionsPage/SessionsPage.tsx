import { useEffect } from "react";
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
      <SessionList />
    </SessionsPageStyled>
  );
};

export default SessionsPage;
