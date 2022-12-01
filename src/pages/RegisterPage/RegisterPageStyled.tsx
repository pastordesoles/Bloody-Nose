import styled from "styled-components";

const RegisterPageStyled = styled.main`
  height: 100%;
  background-image: url("/images/mobileBlackGloves.webp");
  background-size: cover;

  @media (min-width: 500px) {
    background-image: url("/images/MainPageRedGloves.webp");
  }
`;

export default RegisterPageStyled;
