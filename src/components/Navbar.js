import React from 'react'
import { Menu, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loggingOut } from '../redux/actionCreator'

class Navbar extends React.Component{

    render(){
     return(
        <Menu fitted="vertically" fixed="top" className="navbar" inverted>
            <Menu.Item position="left">
                <Image src="/logo_transparent.png" size='tiny' as={Link} to="/spaces"/>
                {this.props.user ? 
                <Link to={`/profile`}>
                    {/* <Image size="mini" src="https://www.freeiconspng.com/uploads/customers-icon-20.png" /> */}
                    <span className="user-welcome">Hi {this.props.user.first_name}</span>
                </Link> 
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