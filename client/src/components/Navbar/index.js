import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import Logo from "../Logo";
import "./navbar.scss";

const Navbar = () => {
  const links = [
    <Link to={ROUTES.MOVIES} className="nav-link">MOVIES</Link>,
    <Link className="nav-link">EVENTS</Link>,
    <Link className="nav-link">MEMBERSHIP</Link>,
    <Link to={ROUTES.SIGN_IN} className="nav-link sign-in">SIGN IN</Link>,
    <Link to={ROUTES.SIGN_UP} className="nav-link button">SIGN UP</Link>
  ];

  const items = links.map(link => {
    return <li className="navbar-item">{link}</li>
  })

  return (
    <nav className="navbar-box">
      <Logo className="logo" />
      <ul className="navbar">
        {items}
      </ul>
    </nav>
  );
};

export default Navbar;
