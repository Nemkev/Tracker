import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./components/Login";
import { RunList } from "./components/RunList";

import "./App.css";

export const Routers = () => {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/runlist" component={RunList} />
        <Redirect from="/" to="login" />
      </Switch>
    </div>
  );
};
