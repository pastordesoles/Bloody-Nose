import { useEffect } from "react";
import { Grid } from "@mui/material";
import Header from "../../components/Header/Header";
import LoadMore from "../../components/LoadMore/LoadMore";
import SessionList from "../../components/SessionList/SessionList";
import useSessions from "../../hooks/useSessions/useSessions";
import { useAppSelector } from "../../redux/hooks";
import SessionsPageStyled from "./SessionsPageStyled";
import Loader from "../../components/Loader/Loader";
import StickyFooter from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";

const SessionsPage = () => {
  const { loadAllsessions, loadMoresessions } = useSessions();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.ui.pagination
  );
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const currentStyle = useAppSelector((state) => state.ui.style);
  const isLastPage = currentPage === totalPages - 1;

  useEffect(() => {
    if (currentPage === 0) {
      loadAllsessions(currentPage, currentStyle);
    } else {
      loadMoresessions(currentPage, currentStyle);
    }
  }, [currentPage, currentStyle, loadAllsessions, loadMoresessions]);

  return (
    <SessionsPageStyled>
      <Header />
      <Filter />
      <SessionList />
      {!isLastPage && !isLoading && (
        <Grid item className="loadmore">
          {}
          <LoadMore
            isLoading={false}
            pagination={{ currentPage, totalPages }}
          />
        </Grid>
      )}
      {isLoading && <Loader />}
      <StickyFooter />
    </SessionsPageStyled>
  );
};

export default SessionsPage;
