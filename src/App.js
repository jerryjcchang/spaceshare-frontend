import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar'
import Registration from './components/Registration'
import Login from './components/Login'
import Spaces from './containers/Spaces'
import SpaceView from './components/SpaceView'
import Profile from './components/Profile'
import { connect } from 'react-redux'
import ScrollToTop from './components/ScrollToTop'
import { fetchingAllSpaces, loggingInCurrentUser, setLoading } from './redux/actionCreator'
import { withRouter } from 'react-router-dom'

class App extends Component {

  componentDidMount(){
    this.props.fetchAllSpaces(this.props.allSpaces.length)
    this.props.setLoading()
    if(localStorage.getItem('token'))
    this.props.getCurrentUser()
  }

  render() {
    return (
      <div className="app">
        <Navbar />
          <ScrollToTop>
        <Switch>
        <Route exact path="/" component={Spaces} />
        <Route exact path="/spaces" component={Spaces} />
        <Route exact path="/login" render={(routeProps) => (
          this.props.currentUser ? (
            <Redirect to={this.props.referrer} />
          ) : (
            <Login routeProps={routeProps} />
          )
        )}/>
        <Route exact path="/register" render={(props) => {
          return (<Registration routeProps={props}/>)
        }} />

        <Route exact path="/spaces/:id" render={(props)=> {
          return (<SpaceView routeProps={props} />)
        }}
        />
        <Route exact path="/profile" component={Profile} />
        </Switch>
        </ScrollToTop>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      currentUser: state.currentUser,
      allSpaces: state.allSpaces,
      referrer: state.referrer
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setLoading: () => {dispatch(setLoading())},
      fetchAllSpaces: (index) => {dispatch(fetchingAllSpaces(index))},
      getCurrentUser: () => {dispatch(loggingInCurrentUser())},
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
