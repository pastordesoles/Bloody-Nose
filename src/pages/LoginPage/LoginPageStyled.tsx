import styled from "styled-components";

const LoginPageStyled = styled.main`
  height: 100vh;
  background-image: url("/images/mobileBlackGloves.webp");
  background-size: cover;

  @media (min-width: 500px) {
    background-image: url("/images/MainPageRedGloves.webp");
  }
`;

export default LoginPageStyled;
