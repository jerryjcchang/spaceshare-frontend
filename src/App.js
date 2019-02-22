import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration'
import Login from './components/Login'

class App extends Component {

  render() {
    return (
      <div className="app">
        {/* <Registration /> */}
        <Login />
      </div>
    );
  }
}

export default App;
