import { Typography } from "@mui/material";
import HeaderStyled from "./HeaderStyled";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser/useUser";

const Header = (): JSX.Element => {
  const { logoutUser } = useUser();
  return (
    <HeaderStyled className="menu-wrapper">
      <header className="header">
        <div>
          <NavLink to={"/"}>
            <Typography component="h1" className="logo-icon">
              Bloody Nose
            </Typography>
          </NavLink>
        </div>
        <div>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn">
            <span className="navicon"></span>
          </label>
          <ul className="menu">
            <li>
              <NavLink to={"/sessions"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>My Profile</NavLink>
            </li>
            <li>
              <NavLink to={"/"}>Set a Session</NavLink>
            </li>
            <li className="button-container">
              <button onClick={logoutUser}>Log out</button>
            </li>
          </ul>
        </div>
      </header>
    </HeaderStyled>
  );
};

export default Header;
