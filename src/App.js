import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import {Role }from './helpers/role';
import {history} from './helpers/history';
import AppNavbar from './components/app-bar'

// // Components
import { authenticationService } from './services/authentication-services';
import LoginPage from './pages/login';
import HomePage from './pages/home';
import UserRegisterForm from './pages/register';
import BugList from './pages/buglist';
import BugDetails from './pages/bugdetails';


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
          <Route exact path="/" component={HomePage} />
          <Route path="/login"  component={LoginPage} />
          <Route path="/bug" component={BugDetails} ></Route>
          <Route exact path="/bug-log" render={ (props) => <BugList /> }/>
          <Route path="/register" component={UserRegisterForm} />
        </Router>
        </div>
    );
  }
}

export default App;