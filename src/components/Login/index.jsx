import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import BearFaceDesktop from "../../assets/bear-face.svg";
import BearFaceMobile from "../../assets/bear-face-pink.svg";
import "./index.scss";

export const Login = () => {
  const [{ email, password, authToken }, setState] = useReducer(
    (s, a) => ({ ...s, ...a }),
    { email: "", password: "", authToken: "" }
  );
  const handleChange = ({ target: { value, name } }) =>
    setState({ [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      localStorage.setItem("accessToken", `${response.data.accessToken}`);
      localStorage.setItem("userId", `${response.data.checkUser._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="placeholder">
      <div className="enter-zone">
        <img
          src={
            document.documentElement.clientWidth > 415
              ? BearFaceDesktop
              : BearFaceMobile
          }
          alt=""
        />
        <input
          className="email-input"
          name="email"
          value={email}
          placeholder="email"
          type="text"
          onChange={handleChange}
        />
        <input
          className="password-input"
          name="password"
          value={password}
          placeholder="password"
          type="text"
          onChange={handleChange}
        />
        <button className="login-button" onClick={handleSubmit}>
          Let me in
        </button>
      </div>
    </main>
  );
};
