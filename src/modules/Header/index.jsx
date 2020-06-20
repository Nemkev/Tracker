import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import Logo from "../../assets/logo.svg";
import Menu from "../../assets/open-menu.svg";
import Cansel from "../../assets/cancel.svg";

export const Header = () => {
  const [currentUrl, setCurrentUrl] = useState(`${window.location.href}`);
  return (
    <header className="header">
      <div className="logo-zone">
        <img src={Logo} />
        <div className="menu-bar">
          <Link to="/info" className="link-desktop">
            <p className="menu-item ">Info</p>
          </Link>
          <Link to="/runlist" className="link-desktop">
            <p className="menu-item ">Jogs</p>
          </Link>
          <Link to="/" className="link-desktop">
            <p className="menu-item ">About Us</p>
          </Link>
        </div>
        <Link to="/nav" className="menu-icon">
          <img
            className="menu-icon"
            src={currentUrl === "http://localhost:3000/nav" ? Cansel : Menu}
            alt=""
          />
        </Link>
      </div>
    </header>
  );
};
