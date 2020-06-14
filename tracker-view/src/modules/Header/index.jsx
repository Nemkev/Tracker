import React from "react";
import "./index.scss";
import Logo from "../../assets/logo.svg";

export const Header = () => {
  return (
    <header className="header">
      <div className="logo-zone">
        <img src={Logo} />
      </div>
    </header>
  );
};
