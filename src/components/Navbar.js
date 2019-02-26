import React from 'react'
import { Menu, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Navbar extends React.Component{
 render(){
     return(
        <Menu fitted="vertically" fixed="top" className="navbar" inverted>
            <Menu.Item position="left">
                <Image src="/logo_transparent.png" size='tiny' as={Link} to="/spaces"/>
                {this.props.user ? <div className="user-welcome">Hi {this.props.user.first_name}</div> : null}
            </Menu.Item>
            <Menu.Item position='right'>
                <h3>About</h3>
            </Menu.Item>
            <Menu.Item>
                {this.props.user ? <h3>Log Out</h3> : <h3>Log In</h3> }
            </Menu.Item>
        </Menu>
     )
 }
}

const mapStateToProps = (state) => {
    return{
        user: state.currentUser,
    }
}

export default connect(mapStateToProps)(Navbar)