import { Paper, TextField, Box, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { useState } from "react";
import { UserRegisterCredentials } from "../../hooks/useUser/types";
import useUser from "../../hooks/useUser/useUser";
import RegisterFormStyled from "./RegisterStyled";
import FormButton from "../FormButton/FormButton";
import commonUserFormInputs from "../../utils/commonUserFormInputs/commonUserFormInputs";

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
        paddingTop: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
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
            padding: 2,
            gap: 2,
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Typography component="h1" className="title">
            Bloody Nose
          </Typography>
          <Typography component="h2" className="title__register">
            Register
          </Typography>

          {commonUserFormInputs(handleFormChange)}
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
            margin="normal"
            InputLabelProps={{ style: { color: "#d3d4d9" } }}
          />

          <FormButton message="REGISTER" />

          <Typography component="span">
            Already have an account?{" "}
            <span className="login">
              <Link to={"/login"} className="login">
                Login here
              </Link>
            </span>
          </Typography>
        </Paper>
      </RegisterFormStyled>
    </Box>
  );
};

export default RegisterForm;
