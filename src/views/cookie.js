import React from 'react';
import axios from 'axios';
function Cookie() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          className="App-link"
          onClick={() =>
              axios.get('http://localhost:5000/cookie', {
                withCredentials: true
              }).then(response => {
              console.log(response);
            }).catch(err => console.log(err))
          }>
          Get Cookie
        </button>
      </header>
    </div>
  );
}
export default Cookie;
