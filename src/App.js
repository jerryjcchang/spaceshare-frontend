import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Registration from './components/Registration'
import Login from './components/Login'
import Spaces from './containers/Spaces'
import SpaceView from './components/SpaceView'
import { connect } from 'react-redux'
import { fetchingAllSpaces, loggingInCurrentUser } from './redux/actionCreator'
import { withRouter } from 'react-router-dom'

class App extends Component {

  componentDidMount(){
    this.props.fetchAllSpaces()
    this.props.getCurrentUser()
  }

  render() {
    return (
      <div className="app">
        <Navbar />
        
        <Route exact path="/register" component={Registration} />
        {/* <Route exact path="/login" component={Login} /> */}

        <Route exact path="/login" render={() => (
          this.props.currentUser ? (
            <Redirect to="/spaces" />
          ) : (
            <Login />
          )
        )}/>

        <Route exact path="/spaces" component={Spaces} />
        <Route exact path="/spaces/:id" render={(props)=> {
          return (<SpaceView routeProps={props} />)
        }} 
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchAllSpaces: () => {dispatch(fetchingAllSpaces())},
      getCurrentUser: () => {dispatch(loggingInCurrentUser())},
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
