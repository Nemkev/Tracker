import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "./components/Login";
import { RunList } from "./components/RunList";
import { Info } from "./components/Info";
import { Nav } from "./components/Nav";
import { Logout } from "./modules/Logout";
import "./App.css";

export const Routers = () => {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/info" component={Info} />
        <Route exact path="/runlist" component={RunList} />
        <Route exact path="/nav" component={Nav} />
        <Redirect from="/" to="login" />
      </Switch>
    </div>
  );
};
