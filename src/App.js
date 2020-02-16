import React from 'react';
import './App.css';
import {history} from './helpers/history';
import {Router, Route, Switch} from 'react-router-dom';

// // Components
import UserRegisterForm from './views/register';
import Login from './views/login';
import HomePage from './views/home';
import GetCookie from './views/cookie';

export default function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/cookie" component={GetCookie} />
          <Route exact path="/signup" component={UserRegisterForm} />
          <Route path="/user" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}
