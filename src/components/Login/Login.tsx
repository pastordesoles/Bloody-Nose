import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserCredentials } from "../../hooks/useUser/types";
import useUser from "../../hooks/useUser/useUser";
import LoginFormStyled from "./LoginStyled";
import FormButton from "../FormButton/FormButton";
import commonUserFormInputs from "../../utils/commonUserFormInputs/commonUserFormInputs";

const LoginForm = (): JSX.Element => {
  const { loginUser } = useUser();

  const userData: UserCredentials = {
    username: "",
    password: "",
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
  const conditions = {
    usernameField: {
      condition: initialForm.username.length < 3 && initialForm.username !== "",
      message: "Username must be at least 3 characters long",
    },
    passwordField: {
      condition: initialForm.password.length < 5 && initialForm.password !== "",
      message: "Password must be at least 5 characters long",
    },
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

          {commonUserFormInputs(handleFormChange, conditions)}
          <FormButton message="SIGN IN" />

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
