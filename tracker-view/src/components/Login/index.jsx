import React from "react";

import BearFace from "../../assets/bear-face.svg";
import "./index.scss";

export const Login = () => {
  return (
    <main classname="placeholder">
      <div className="enter-zone">
        <img src={BearFace} alt="" />
        <button className="login-button">Let me in</button>
      </div>
    </main>
  );
};
