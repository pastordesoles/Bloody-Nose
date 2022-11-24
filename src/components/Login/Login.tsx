import { Paper, Button, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRegisterCredentials } from "../../hooks/useUser/types";
import useUser from "../../hooks/useUser/useUser";
import LoginFormStyled from "./LoginStyled";

const LoginForm = (): JSX.Element => {
  const { loginUser } = useUser();

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
    };
    await loginUser(formDataToSubmit);
  };

  return (
    <Box
      sx={{
        paddingTop: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <LoginFormStyled
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
            gap: 1.7,
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Typography component="h1" className="title">
            Bloody Nose
          </Typography>
          <Typography component="h2" className="title__register">
            SIGN IN
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
            className="login-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, padding: "15px" }}
            style={{ background: "#04395E", fontSize: "1,5rem" }}
          >
            SIGN IN
          </Button>

          <Typography component="span">
            You don't have an account?{" "}
            <span className="register">
              <Link to={"/"} className="register">
                Register here
              </Link>
            </span>
          </Typography>
        </Paper>
      </LoginFormStyled>
    </Box>
  );
};

export default LoginForm;
