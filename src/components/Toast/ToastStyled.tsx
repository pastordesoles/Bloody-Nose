import { Alert, styled } from "@mui/material";

const ToastStyled = styled(Alert)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ToastStyled;
