import React, { useState } from "react";
import "./App.css";
import { history } from "./helpers/history";
import { Router, Route, Switch } from "react-router-dom";

// // Components
import UserRegisterForm from "./pages/register";
import Login from "./pages/login";
import HomePage from "./pages/home";
import { userHandler } from "./handlers/users";

export default function App() {

  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={UserRegisterForm} />
          <Route path="/user" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}
