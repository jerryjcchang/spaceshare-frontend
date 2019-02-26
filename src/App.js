import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Registration from './components/Registration'
import Login from './components/Login'
import Spaces from './containers/Spaces'
import SpaceView from './components/SpaceView'

class App extends Component {

  render() {
    return (
      <div className="app">
        <Navbar />
        
        <Route exact path="/register" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/spaces" component={Spaces} />
        <Route exact path="/spaces/:id" render={()=> {
          return (<SpaceView />)
        }} 
        />
      </div>
    );
  }
}

export default App;
