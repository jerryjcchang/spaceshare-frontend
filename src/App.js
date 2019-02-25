import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Registration from './components/Registration'
import Login from './components/Login'
import Spaces from './containers/Spaces'
class App extends Component {

  render() {
    return (
      <div className="app">
        <Navbar />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Spaces} />
      </div>
    );
  }
}

export default App;
