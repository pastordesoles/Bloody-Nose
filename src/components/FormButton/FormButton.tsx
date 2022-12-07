import Button from "@mui/material/Button";

interface PrimaryButtonProps {
  message: string;
}

const FormButton = ({ message }: PrimaryButtonProps) => {
  return (
    <Button
      className="register-button"
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2, padding: "15px" }}
      style={{ background: "#04395E", fontSize: "1,5rem" }}
    >
      {message}
    </Button>
  );
};

export default FormButton;
