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
                <div className="user-welcome">Hi {this.props.user.first_name}</div></Link> 
                : 
                null}
                
            </Menu.Item>
            <Menu.Item position='right'>
                <h3>About</h3>
            </Menu.Item>
            {this.props.user ?
            <Menu.Item onClick={this.props.logOut}>
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