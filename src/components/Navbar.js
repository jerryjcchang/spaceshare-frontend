import React from 'react'
import { Menu, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loggingOut } from '../redux/actionCreator'

class Navbar extends React.Component{

    state={
        hover: false
    }

    handleWelcomeDiv = () => {
        return (!this.state.hover ? `Hi ${this.props.user.first_name}` : `SpacePoints: ${this.props.user.points.toLocaleString()}`)
    }

    render(){
     return(
        <Menu fitted="vertically" fixed="top" className="navbar" inverted>
            <Menu.Item position="left">
                <Image src="/logo_transparent.png" size='tiny' as={Link} to="/spaces"/>
                {this.props.user ? 
                <span 
                    onClick={()=>{this.setState({hover: !this.state.hover})}} 
                    // onMouseLeave={()=>{this.setState({hover: !this.state.hover})}} 
                    className="user-welcome">{this.handleWelcomeDiv()}
                </span>
                : 
                null}
            </Menu.Item>
            <Menu.Item position='right'>
                <h3>About</h3>
            </Menu.Item>
            {this.props.user ?
            <Menu.Item as={Link} to="/profile"><h3>My Profile</h3></Menu.Item> : null}
            {this.props.user ?
            <Menu.Item onClick={this.props.logOut} as={Link} to="/spaces">
                <h3>Log Out</h3>
            </Menu.Item>
            :
            <Menu.Item as={Link} to="/login">
                <h3>Log In</h3>
            </Menu.Item>
            }
        </Menu>
     )
 }
}

const mapStateToProps = (state) => {
    return{
        user: state.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => {dispatch(loggingOut())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)