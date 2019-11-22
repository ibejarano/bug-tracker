import React, { useState, useEffect } from "react";
import "./App.css";
import { Router, Route } from "react-router-dom";
import { history } from "./helpers/history";
import AppNavbar from "./components/app-bar";

// // Components
import LoginPage from "./pages/login";
import HomeGuestPage from "./pages/home-guest";
import HomePage from "./pages/home";
import UserRegisterForm from "./pages/register";
import IssueList from "./pages/issue-list";
import IssueDetails from "./pages/issue";
import ReportIssue from "./pages/report-issue";
import EditIssue from "./pages/edit-issue";
import { userHandler } from "./handlers/users";

export default function App(props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (currentUser){
      //authenticationService.currentUser.subscribe(x => setCurrentUser(x));
      setCurrentUser( 'Some user' )
    } else {
      setCurrentUser(null)
    }
  });

  const logout = () => {
    console.log('Logging out')
    userHandler.logout()
    history.push("/login");
  };

  return (
    <div>
      <Router history={history}>
        <AppNavbar currentUser={currentUser} logout={ logout } />
        {!currentUser && <Route exact path="/" component={HomeGuestPage} />}
        {currentUser &&  <Route exact path="/" component={HomePage} />}
        <Route path="/login" component={LoginPage} />
        <Route path="/issue" component={IssueDetails}></Route>
        <Route path="/issue-log" render={props => <IssueList />} />
        <Route path="/register" component={UserRegisterForm} />
        <Route path="/report-issue" component={ReportIssue} />
        <Route path="/issue-edit" component={EditIssue} />
      </Router>
    </div>
  );
}