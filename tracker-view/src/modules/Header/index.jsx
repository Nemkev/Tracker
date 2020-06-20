import React from "react";
import "./index.scss";
import Logo from "../../assets/logo.svg";
import Menu from "../../assets/open-menu.svg";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo-zone">
        <img src={Logo} />
        <div className="menu-bar">
          <p className="menu-item">Jogs</p>
          <p className="menu-item">Info</p>
          <p className="menu-item">Contact us</p>
        </div>
        <img className="menu-icon" src={Menu} alt="" />
      </div>
    </header>
  );
};
