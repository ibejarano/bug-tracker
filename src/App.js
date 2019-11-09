import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import BugList from './components/bug-list';
import ReportBugForm from './components/report-bug-form';
import EdifBugForm from './components/edit-bug-form';

export default function App() {

    return (
      <div className="App">
      <header className="App-header">
          Welcome to my bug Tracker App!
          <nav>
            <ul>
              <li><a href='/'>Home</a></li>
              <li><a href='/add'>Add new Bug</a></li>
            </ul>
          </nav>
      </header>
      <Router >
        <Route path='/' exact component={BugList} />
        <Route path='/add' component={ReportBugForm} />
        <Route path='/update/:id' component={EdifBugForm}/>
      </Router>
    </div>
    );
}