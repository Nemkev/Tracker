import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

export const Nav = () => {
  return (
    <div className="nav-layer">
      <ul className="route-list">
        <Link to="/runlist" className="link">
          <li className="route-list-item">Jogs</li>
        </Link>
        <Link to="/info" className="link">
          <li className="route-list-item">Info</li>
        </Link>
        <Link className="link">
          <li className="route-list-item">Contact Us</li>
        </Link>
      </ul>
    </div>
  );
};
