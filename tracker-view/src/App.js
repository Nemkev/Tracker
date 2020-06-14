import React from "react";
import { Header } from "./modules/Header";
import { Routers } from "./Router";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

export const App = () => {
  return (
    <Router>
      <Header />
      <Routers />
    </Router>
  );
};

export default App;
