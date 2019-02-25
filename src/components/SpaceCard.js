import React from 'react'
import { Card, Image } from 'semantic-ui-react'

class SpaceCard extends React.Component{
    
    render(){
        return(
            <Card raised fluid onClick={() => {alert("clicking space")}}>
                <div className="rate-div"><h1>$35 hr</h1></div>
                <Image src="https://www.wework.com/public/images/Web_72DPI-20180612_WeWork_Dalian_Lu_-_Common_Areas_-_Couch_Area-4__1_.jpg" />
                <Card.Content>
                <Card.Header>Space Card</Card.Header>
                <Card.Description>Space Description</Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

export default SpaceCard