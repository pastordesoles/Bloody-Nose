import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppSelector } from "../../redux/hooks";
import { Grid } from "@mui/material";
import SessionCard from "../SessionCard/SessionCard";
import { SelectStyled, SessionListStyled } from "./SessionListStyled";
import { useMemo, useState } from "react";

const SessionList = (): JSX.Element => {
  const { sessions } = useAppSelector((state) => state.sessions);

  const [filter, setFilter] = useState("all");

  const stylesFiltered = useMemo(() => {
    if (filter === "karate") {
      return sessions.filter((session) => session?.style === "karate");
    }

    if (filter === "boxing") {
      return sessions.filter((session) => session?.style === "boxing");
    }

    if (filter === "mma") {
      return sessions.filter((session) => session?.style === "mma");
    }

    if (filter === "kickboxing") {
      return sessions.filter((session) => session?.style === "kickboxing");
    }

    return sessions;
  }, [filter, sessions]);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <SelectStyled sx={{ minWidth: 100 }}>
        <FormControl fullWidth variant="filled" className="select">
          <InputLabel id="demo-simple-select-label">Styles</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Styles"
            onChange={handleFilterChange}
          >
            <MenuItem value={"all"}>All Sessions</MenuItem>
            <MenuItem value={"karate"}>Karate</MenuItem>
            <MenuItem value={"mma"}>MMA</MenuItem>
            <MenuItem value={"boxing"}>Boxing</MenuItem>
            <MenuItem value={"kickboxing"}>Kickboxing</MenuItem>
          </Select>
        </FormControl>
      </SelectStyled>
      <SessionListStyled sx={{ flexGrow: 1 }} aria-label="list container">
        <Grid
          container
          sx={{ padding: 2 }}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 8 }}
        >
          {stylesFiltered.map((session, index) => (
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
