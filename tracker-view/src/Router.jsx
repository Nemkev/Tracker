import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./components/Login";
import { RunList } from "./components/RunList";
import { Info } from "./components/Info";

import "./App.css";

export const Routers = () => {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/runlist" component={RunList} />
        <Redirect from="/" to="login" />
      </Switch>
    </div>
  );
};
