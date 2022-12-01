import {
  Paper,
  TextField,
  Box,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import FormButton from "../FormButton/FormButton";
import useSessions from "../../hooks/useSessions/useSessions";
import SessionFormStyled from "./SessionFormStyled";

export interface InitialUserData {
  content: string;
  date: string;
  length: number;
  level: string;
  location: string;
  material: string;
  participants: number;
  style: string;
  title: string;
  picture: File;
}

const SessionForm = (): JSX.Element => {
  const { addOneSession } = useSessions();

  const userData: InitialUserData = {
    content: "",
    date: "",
    length: 0,
    level: "",
    location: "",
    material: "",
    participants: 0,
    style: "",
    title: "",
    picture: {} as File,
  };

  const [initialForm, setInitialForm] = useState(userData);

  const handleFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.id === "picture") {
      const input = event.target as HTMLInputElement;
      const files = input.files as FileList;

      setInitialForm({
        ...initialForm,

        [event.target.id]: files[0],
      });
      return;
    }

    setInitialForm({
      ...initialForm,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formDataToSubmit = {
      title: initialForm.title,
      content: initialForm.content,
      date: initialForm.date,
      length: initialForm.length,
      level: initialForm.level,
      location: initialForm.location,
      material: initialForm.material,
      participants: initialForm.participants,
      style: initialForm.style,
      picture: initialForm.picture,
    };

    await addOneSession(formDataToSubmit);
  };

  return (
    <Box
      sx={{
        paddingTop: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "80%",
      }}
    >
      <SessionFormStyled
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 1.5,
          gap: 0.5,
        }}
      >
        <Paper
          className="form-container"
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            gap: 2,
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Typography component="h1" className="title">
            Create a Session{" "}
          </Typography>

          <TextField
            required
            focused
            fullWidth
            name="title"
            aria-label="title"
            type="text"
            id="title"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="outlined"
            label="Title"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
          />
          <TextField
            required
            focused
            fullWidth
            name="location"
            aria-label="location"
            type="text"
            id="location"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="outlined"
            label="Location"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
          />
          <TextField
            required
            focused
            fullWidth
            name="content"
            aria-label="content"
            type="text"
            id="content"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="outlined"
            label="Content"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
          />
          <TextField
            required
            focused
            fullWidth
            name="length"
            aria-label="length"
            type="number"
            inputProps={{ min: 1, max: 99 }}
            id="length"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="outlined"
            label="Length"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
          />

          <TextField
            required
            focused
            fullWidth
            name="date"
            aria-label="date"
            type="date"
            id="date"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="outlined"
            label="Date"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
          />
          <TextField
            required
            focused
            fullWidth
            name="level"
            aria-label="level"
            type="text"
            id="level"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="outlined"
            label="Level"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
          />
          <TextField
            required
            focused
            fullWidth
            name="material"
            aria-label="material"
            type="text"
            id="material"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="outlined"
            label="Material"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
          />
          <TextField
            required
            focused
            fullWidth
            name="participants"
            aria-label="participants"
            type="number"
            inputProps={{ min: 1, max: 99 }}
            id="participants"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="outlined"
            label="Participants"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
          />

          <FormLabel id="demo-row-radio-buttons-group-label">Style</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="karate"
              name="style"
              id="style"
              aria-label="style"
              control={<Radio />}
              label="Karate"
            />
            <FormControlLabel
              value="boxing"
              control={<Radio />}
              label="Boxing"
            />
            <FormControlLabel
              value="kickboxing"
              control={<Radio />}
              label="Kickboxing"
            />
            <FormControlLabel value="mma" control={<Radio />} label="MMA" />
          </RadioGroup>

          <TextField
            focused
            fullWidth
            name="picture"
            aria-label="picture"
            type="file"
            id="picture"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="outlined"
            label="Picture"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
          />
          <FormButton message="CREATE" />
        </Paper>
      </SessionFormStyled>
    </Box>
  );
};

export default SessionForm;
