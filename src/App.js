import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import {Role }from './helpers/role';
import {history} from './helpers/history';
import AppNavbar from './components/app-bar'

// // Components
import { authenticationService } from './services/authentication-services';
import LoginPage from './pages/login';
import HomeGuestPage from './pages/home-guest';
import HomePage from './pages/home';
import UserRegisterForm from './pages/register';
import IssueList from './pages/buglist';
import IssueDetails from './pages/bugdetails';
import ReportIssue from './pages/report-bug';
import EditIssue from './pages/edit-issue';


class App extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        currentUser: null
      }
    }

    componentDidMount() {
      authenticationService.currentUser.subscribe(x => this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin
      }));
    }

    logout(){
      authenticationService.logout(this.state.currentUser._id);
      history.push('/login');
    }

    setUser(userDataFromServer){
      this.setState({
        currentUser: userDataFromServer
      })
    }
  
    render (){
      const {currentUser} = this.state;
      return (
        <div>
        <Router history={history}  >
          <AppNavbar currentUser={currentUser} logout={this.logout.bind(this)} />
          { !currentUser &&
            <Route exact path="/" component={HomeGuestPage} />
          }
          {
            currentUser && 
            <Route exact path="/" 
            render={(props) => <HomePage user={currentUser} /> }
            />
          }
          <Route path="/login"  component={LoginPage} />
          <Route path="/issue" component={IssueDetails} ></Route>
          <Route path="/issue-log" render={ (props) => <IssueList /> }/>
          <Route path="/register" component={UserRegisterForm} />
          <Route path="/report-issue" component={ReportIssue} />
          <Route path="/issue-edit" component={ EditIssue } />
        </Router>
        </div>
    );
  }
}

export default App;