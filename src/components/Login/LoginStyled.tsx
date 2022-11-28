import { Container, styled } from "@mui/material";

const LoginStyled = styled(Container)`
  .title {
    color: #d3d4d9;
    font-family: Coustard;
    font-weight: 400;
    font-size: 2rem;
  }

  .title__register {
    color: #eca72c;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: Montserrat;
  }

  .form-container {
    background-color: #3c1212;
  }
  .input {
    color: #d3d4d9;
  }

  span {
    color: #d3d4d9;
  }

  .register {
    color: #eca72c;
    text-decoration: none;
  }
`;

export default LoginStyled;
