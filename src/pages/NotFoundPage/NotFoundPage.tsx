import { Paper, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
import NotFoundPageStyled from "./NotFoundPageStyled";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  return (
    <>
      <Header />
      <NotFoundPageStyled>
        <Paper
          className="not-found"
          component="article"
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            gap: 1.7,
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Typography component="span" className="title">
            404 page not found
          </Typography>

          <Typography component="span">
            Go back to{" "}
            <span className="register">
              <Link to={"/sessions"} className="redirect">
                HOME
              </Link>
            </span>
          </Typography>
        </Paper>
        {isLoading && <Loader />}
      </NotFoundPageStyled>
    </>
  );
};

export default NotFoundPage;
