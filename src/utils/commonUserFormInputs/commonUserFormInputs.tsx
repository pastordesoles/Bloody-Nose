import { TextField } from "@mui/material";

const commonUserFormInputs = (
  handleFormChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
) => {
  return (
    <>
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
    </>
  );
};

export default commonUserFormInputs;
