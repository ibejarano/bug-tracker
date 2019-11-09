import React from 'react';
import './App.css';
import axios from 'axios';

// Components
import BugList from './components/bug-list';
import ReportBugForm from './components/report-bug-form';


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

  onSubmit(e){
    console.log(e.target.body)
  }

  render() {

    return (
      <div className="App">
      <header className="App-header">
          Welcome to my bug Tracker App!
      </header>
      <BugList list={this.state.bugList} />
      <ReportBugForm onSubmit={this.onSubmit.bind(this)} />
    </div>
    );
  }
}

export default App;