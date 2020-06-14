import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./components/Login";

import "./App.css";

export const Routers = () => {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect from="/" to="login" />
      </Switch>
    </div>
  );
};
