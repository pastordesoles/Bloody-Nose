import { Paper, Button, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { UserRegisterCredentials } from "../../hooks/useUser/types";
import useUser from "../../hooks/useUser/useUser";
import RegisterFormStyled from "./RegisterStyled";

const RegisterForm = (): JSX.Element => {
  const { registerUser } = useUser();

  const userData: UserRegisterCredentials = {
    username: "",
    password: "",
    email: "",
  };

  const [initialForm, setData] = useState(userData);

  const handleFormChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData({
      ...initialForm,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const formDataToSubmit = {
      username: initialForm.username,
      password: initialForm.password,
      email: initialForm.email,
    };
    await registerUser(formDataToSubmit);
  };

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <RegisterFormStyled
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
            padding: 2.9,
            gap: 2,
            width: "50%",
          }}
        >
          <Typography component="h1" className="title">
            Bloody Nose
          </Typography>
          <Typography component="h2" className="title__register">
            Register
          </Typography>

          <TextField
            required
            fullWidth
            name="username"
            aria-label="username"
            label="Username"
            type="text"
            id="username"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            variant="filled"
            color="info"
            sx={{
              input: {
                color: "#d3d4d9",
              },
            }}
            InputLabelProps={{ style: { color: "#d3d4d9" } }}
          />
          <TextField
            required
            fullWidth
            name="email"
            aria-label="email"
            type="text"
            id="email"
            autoComplete="off"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#d3d4d9" } }}
            variant="filled"
            label="Email"
            InputLabelProps={{ style: { color: "#d3d4d9" } }}
          />
          <TextField
            required
            fullWidth
            name="password"
            aria-label="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            variant="filled"
            onChange={handleFormChange}
            className="input"
            sx={{ input: { color: "#d3d4d9" } }}
            InputLabelProps={{ style: { color: "#d3d4d9" } }}
          />
          <Button
            className="register-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, padding: "15px" }}
            style={{ background: "#04395E", fontSize: "1,5rem" }}
          >
            REGISTER
          </Button>

          <Typography component="span">
            Already have an account? <span className="login">Login here</span>
          </Typography>
        </Paper>
      </RegisterFormStyled>
    </Box>
  );
};

export default RegisterForm;
