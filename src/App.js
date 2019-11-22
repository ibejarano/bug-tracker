import React, {useState, useEffect} from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
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
import { authenticationService } from "./services/authentication-services";

export default function App() {
  const [ isLogged , setIsLogged] = useState(false);

  const logout = async () => {
    try{
      console.log("Logging out");
      const res = await userHandler.logout();
      console.log(res)
      history.push("/login");
      setIsLogged(false)
    } catch(error){
      console.log(error.toString())
    }
  };

  useEffect(()=>{
    console.log('I am using the effect!')
  })

  const updateLogin = () => {
    setIsLogged(true)
  }

  return (
    <div>
      <Router history={history} forceRefresh={true}>
        <AppNavbar logout={logout} />
        <Switch>
        {!isLogged && <Route exact path="/" component={HomeGuestPage} />}
        {isLogged && <Route exact path="/" component={HomePage} />}
        <Route path="/login" component={LoginPage} />
        <Route path="/issue" component={IssueDetails}></Route>
        <Route path="/issue-log" component={IssueList} />
        <Route path="/register" component={UserRegisterForm} />
        <Route path="/report-issue" component={ReportIssue} />
        <Route path="/issue-edit" component={EditIssue} />
        </Switch>
      </Router>
    </div>
  );
}
