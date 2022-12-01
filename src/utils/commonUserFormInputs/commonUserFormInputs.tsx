import { TextField } from "@mui/material";

interface Conditions {
  usernameField: {
    condition: boolean;
    message: string;
  };
  passwordField: {
    condition: boolean;
    message: string;
  };
}

const commonUserFormInputs = (
  handleFormChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void,
  conditions: Conditions
) => {
  return (
    <>
      <TextField
        required
        fullWidth
        error={conditions.usernameField.condition}
        helperText={conditions.usernameField.message}
        FormHelperTextProps={{ style: { color: "#d3d4d9" } }}
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
        error={conditions.passwordField.condition}
        helperText={conditions.passwordField.message}
        FormHelperTextProps={{ style: { color: "#d3d4d9" } }}
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
    </>
  );
};

export default commonUserFormInputs;
