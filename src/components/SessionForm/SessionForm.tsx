import {
  Paper,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import FormButton from "../FormButton/FormButton";
import useSessions from "../../hooks/useSessions/useSessions";
import SessionFormStyled from "./SessionFormStyled";
import { useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router-dom";

import OpenStreetMap from "../Map/Map";

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
  picture: File | string;
}

interface SessionFormProps {
  isUpdate: boolean;
}

const SessionForm = ({ isUpdate }: SessionFormProps): JSX.Element => {
  const { addOneSession, updateOneSession, loadOneSession } = useSessions();
  const [style, setStyle] = useState("");
  const { session } = useAppSelector((state) => state.sessions);
  const { id: sessionId } = useParams<"id">();

  const handleChange = (event: SelectChangeEvent) => {
    setStyle(event.target.value);
  };

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
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  useEffect(() => {
    if (isUpdate) {
      loadOneSession(sessionId!);
    }
  }, [isUpdate, loadOneSession, sessionId]);

  useEffect(() => {
    if (isUpdate) {
      setInitialForm({
        ...session,
        picture: ""!,
      });
    }
  }, [isUpdate, session]);

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

      const url = URL.createObjectURL(files[0]);
      setImagePreviewUrl(url);
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
      style: style,
      picture: initialForm.picture,
    };

    if (isUpdate) {
      if (formDataToSubmit.picture === "") {
        const newFormData = {
          title: initialForm.title,
          content: initialForm.content,
          date: initialForm.date,
          length: initialForm.length,
          level: initialForm.level,
          location: initialForm.location,
          material: initialForm.material,
          participants: initialForm.participants,
          style: style,
        };

        await updateOneSession(newFormData, session.id!);
        return;
      }

      await updateOneSession(formDataToSubmit, session.id!);
      return;
    }

    await addOneSession(formDataToSubmit);
  };

  const conditions = {
    titleField: {
      condition: initialForm.title?.length < 5 && initialForm.title !== "",
      message: "Title must be at least 5 characters long",
    },
    locationField: {
      condition:
        initialForm.location?.length < 5 && initialForm.location !== "",
      message: "Location must be at least 5 characters long",
    },
    contentField: {
      condition: initialForm.content?.length < 5 && initialForm.content !== "",
      message: "Content must be at least 5 characters long",
    },
    levelField: {
      condition: initialForm.level?.length < 3 && initialForm.level !== "",
      message: "Content must be at least 3 characters long",
    },
    materialField: {
      condition:
        initialForm.material?.length < 3 && initialForm.material !== "",
      message: "Content must be at least 3 characters long",
    },
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100vw",
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
            {isUpdate ? "Edit a Session" : "Create a Session"}
          </Typography>

          <TextField
            required
            fullWidth
            error={conditions.titleField.condition}
            helperText={conditions.titleField.message}
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
            value={initialForm.title || ""}
          />

          <OpenStreetMap
            center={[41.3851, 2.1734]} // Barcelona
            zoom={12}
            height={200}
            width={400}
          />
          <TextField
            required
            fullWidth
            error={conditions.locationField.condition}
            helperText={conditions.locationField.message}
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
            value={initialForm.location || ""}
          />

          <TextField
            required
            fullWidth
            error={conditions.contentField.condition}
            helperText={conditions.contentField.message}
            name="content"
            aria-label="content"
            type="text"
            multiline={true}
            id="content"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="outlined"
            label="Content"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
            value={initialForm.content || ""}
          />
          <TextField
            required
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
            value={initialForm.length || ""}
          />

          <TextField
            required
            fullWidth
            name="date"
            aria-label="date"
            type="date"
            id="date"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="standard"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
            value={initialForm.date || ""}
          />
          <TextField
            required
            fullWidth
            error={conditions.levelField.condition}
            helperText={conditions.levelField.message}
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
            value={initialForm.level || ""}
          />
          <TextField
            required
            fullWidth
            error={conditions.materialField.condition}
            helperText={conditions.materialField.message}
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
            value={initialForm.material || ""}
          />
          <TextField
            required
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
            value={initialForm.participants || ""}
          />

          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Style</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="style-select"
              data-testid="my-wrapper"
              value={style}
              label="Style"
              variant="outlined"
              onChange={handleChange}
            >
              <MenuItem value={"karate"}>Karate</MenuItem>
              <MenuItem value={"boxing"}>Boxing</MenuItem>
              <MenuItem value={"mma"}>MMA</MenuItem>
              <MenuItem value={"kickboxing"}>Kickboxing</MenuItem>
            </Select>
          </FormControl>

          {imagePreviewUrl && (
            <Grid container item justifyContent={"center"}>
              <img
                src={imagePreviewUrl}
                alt="preview"
                width={"100%"}
                height={"300px"}
                style={{ objectFit: "cover" }}
              />
            </Grid>
          )}

          <TextField
            fullWidth
            name="picture"
            aria-label="picture"
            type="file"
            id="picture"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#000000" } }}
            variant="standard"
            label="Picture"
            margin="normal"
            InputLabelProps={{ style: { color: "#000000" } }}
          />
          <FormButton message="SUBMIT" />
        </Paper>
      </SessionFormStyled>
    </Box>
  );
};

export default SessionForm;
