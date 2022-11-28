import { useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "../../components/Header/Header";
import LoadMore from "../../components/LoadMore/LoadMore";
import SessionList from "../../components/SessionList/SessionList";
import useSessions from "../../hooks/useSessions/useSessions";
import { useAppSelector } from "../../redux/hooks";
import SessionsPageStyled from "./SessionsPageStyled";

const SessionsPage = () => {
  const { loadAllsessions } = useSessions();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.ui.pagination
  );
  const isLastPage = currentPage === totalPages - 1;

  useEffect(() => {
    loadAllsessions(currentPage);
  }, [currentPage, loadAllsessions]);
  return (
    <SessionsPageStyled>
      <Header />
      <SessionList />
      {!isLastPage && (
        <Grid item className="loadmore">
          <LoadMore
            isLoading={false}
            pagination={{ currentPage, totalPages }}
          />
        </Grid>
      )}
    </SessionsPageStyled>
  );
};

export default SessionsPage;
