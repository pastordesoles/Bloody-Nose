import { useAppSelector } from "../../redux/hooks";
import Grid from "@mui/material/Grid";
import SessionCard from "../SessionCard/SessionCard";
import { SessionListStyled } from "./SessionListStyled";

const SessionList = (): JSX.Element => {
  const { sessions } = useAppSelector((state) => state.sessions);

  return (
    <>
      <SessionListStyled sx={{ flexGrow: 1 }} aria-label="list container">
        <Grid
          container
          sx={{ px: 2, py: 3 }}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 8 }}
        >
          {sessions.map((session, index) => (
            <Grid
              item
              xs={1}
              sm={4}
              md={4}
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <SessionCard session={session} isDetail={false} />
            </Grid>
          ))}
        </Grid>
      </SessionListStyled>
    </>
  );
};

export default SessionList;
