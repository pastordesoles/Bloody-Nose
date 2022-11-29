import { useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "../../components/Header/Header";
import LoadMore from "../../components/LoadMore/LoadMore";
import SessionList from "../../components/SessionList/SessionList";
import useSessions from "../../hooks/useSessions/useSessions";
import { useAppSelector } from "../../redux/hooks";
import SessionsPageStyled from "./SessionsPageStyled";
import Loader from "../../components/Loader/Loader";

const SessionsPage = () => {
  const { loadAllsessions, loadMoresessions } = useSessions();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.ui.pagination
  );
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const isLastPage = currentPage === totalPages - 1;

  useEffect(() => {
    if (currentPage === 0) {
      loadAllsessions(currentPage);
    } else {
      loadMoresessions(currentPage);
    }
  }, [currentPage, loadAllsessions, loadMoresessions]);

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
      {isLoading && <Loader />}
    </SessionsPageStyled>
  );
};

export default SessionsPage;
