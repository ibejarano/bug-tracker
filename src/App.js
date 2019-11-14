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

class App extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        currentUser: null,
        isAdmin: false
      }
    }

    componentDidMount() {
      authenticationService.currentUser.subscribe(x => this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin
      }));
    }

    logout(){
      authenticationService.logout();
      history.push('/login');
    }
  
    render (){
      const {currentUser, isAdmin} = this.state;

      return (
        <div>
        <Router history={history}>
          <AppNavbar currentUser={currentUser} logout={this.logout.bind(this)} isAdmin={isAdmin} />
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
        </Router>
        </div>
    );
  }
}

export default App;