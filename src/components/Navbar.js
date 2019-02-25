import React from 'react'
import { Menu, Button, Image } from 'semantic-ui-react'

class Navbar extends React.Component{
 render(){
     return(
        <Menu fitted="vertically" fixed="top" className="navbar" inverted>
            <Menu.Item position="left">
                <Image src="/logo_transparent.png" size='tiny'/>
            </Menu.Item>
            <Menu.Item position='right'>
                <h3>About</h3>
            </Menu.Item>
            <Menu.Item>
                <h3>My Profile</h3>
            </Menu.Item>
        </Menu>
     )
 }
}

export default Navbar