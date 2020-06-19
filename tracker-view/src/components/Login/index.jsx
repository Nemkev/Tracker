import React, { useReducer } from "react";
import axios from "axios";

import BearFace from "../../assets/bear-face.svg";
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
        <img src={BearFace} alt="" />
        <input
          name="email"
          value={email}
          placeholder="email"
          type="text"
          onChange={handleChange}
        />
        <input
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
