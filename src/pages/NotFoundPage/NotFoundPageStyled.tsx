import styled from "styled-components";

const NotFoundPageStyled = styled.main`
  height: 100vh;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  background-image: url("/images/mobile404.webp");
  background-size: cover;

  @media (min-width: 500px) {
    background-image: url("/images/Desktop404.webp");
  }

  article {
    height: 25%;
    width: 90%;
  }

  .redirect {
    color: #eca72c;
    text-decoration: none;
  }

  .not-found {
    background-color: #3c1212;
  }

  span {
    color: #d3d4d9;
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

export default NotFoundPageStyled;
