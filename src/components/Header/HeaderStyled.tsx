import styled from "styled-components";

const HeaderStyled = styled.div`
  ul {
    list-style: none;
  }
  .logo-icon {
    color: #d3d4d9;
    font-family: Coustard;
    font-weight: bold;
    font-size: 2rem;
    position: absolute;
    left: 40px;
  }
  .logo-icon:hover {
    color: #fff;
    cursor: pointer;
  }
  .active {
    font-weight: bold;
  }
  button {
    color: #1f2937;
    margin-top: 0;
    background-color: #fff;
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  button:hover {
    background-color: #4681f2;
    color: #fff;
  }
  .header {
    background-color: #1f0505;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    width: 100%;
    z-index: 3;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .header ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }
  .header li a {
    display: block;
    color: #fff;
    padding: 20px 20px;
    text-decoration: none;
    font-size: 1.2rem;
    text-align: center;
  }
  .header li a:hover,
  .header .menu-btn:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .header .logo {
    color: #fff;
    display: block;
    float: left;
    font-size: 1.5em;
    padding: 12px 20px;
    text-decoration: none;
  }
  .header .menu {
    clear: both;
    max-height: 0;
    transition: max-height 0.2s ease-out;
  }

  .header .menu-icon {
    cursor: pointer;
    float: right;
    padding: 28px 20px;
    margin-right: 30px;
    position: relative;
    user-select: none;
  }
  .header .menu-icon .navicon {
    background: #fff;
    display: block;
    height: 2px;
    position: relative;
    transition: background 0.2s ease-out;
    width: 18px;
  }
  .header .menu-icon .navicon:before,
  .header .menu-icon .navicon:after {
    background: #fff;
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    transition: all 0.2s ease-out;
    width: 100%;
  }
  .header .menu-icon .navicon:before {
    top: 5px;
  }
  .header .menu-icon .navicon:after {
    top: -5px;
  }

  .header .menu-btn {
    display: none;
  }
  .header .menu-btn:checked ~ .menu {
    max-height: 340px;
  }
  .header .menu-btn:checked ~ .menu-icon .navicon {
    background: transparent;
  }
  .header .menu-btn:checked ~ .menu-icon .navicon:before {
    transform: rotate(-45deg);
  }
  .header .menu-btn:checked ~ .menu-icon .navicon:after {
    transform: rotate(45deg);
  }
  .header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
  .header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
    top: 0;
  }

  .button-container {
    display: flex;
    justify-content: center;
  }

  button {
    background: none;
    color: white;
    border: none;
    padding: 20px 20px;
    font: inherit;
    font-size: 1.2rem;
    cursor: pointer;
    outline: inherit;
    text-align: center;
  }
`;

export default HeaderStyled;
