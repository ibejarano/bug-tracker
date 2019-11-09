import React from 'react';
import './App.css';
import BugList from './components/bug-list';
import axios from 'axios';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      bugList: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/bugs')
    .then((res) => this.setState({
      bugList: res.data
    })
    )
    .catch(err => console.log('There is an error', err))
  }

  render() {

    return (
      <div className="App">
      <header className="App-header">
          Welcome to my bug Tracker App!
      </header>
      <BugList list={this.state.bugList} />
    </div>
    );
  }
}

export default App;