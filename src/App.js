import React from 'react';
import './App.css';
import { Router, Route , Link} from 'react-router-dom';
import {Role }from './helpers/role';
import {history} from './helpers/history';

// Components
import { authenticationService } from './services/authentication-services';
import LoginPage from './pages/login';

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
        <Router history={history}>
        <div>
            {currentUser &&
                <nav >
                    <div >
                        <Link to="/" >Home</Link>
                        {isAdmin && <Link to="/admin">Admin</Link>}
                        <a onClick={this.logout}>Logout</a>
                    </div>
                </nav>
            }

           <Route path="/login" component={LoginPage} />

        </div>
    </Router>
    );
  }
}

export default App;