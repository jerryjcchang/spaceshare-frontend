import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class SpaceCard extends React.Component{
    
    render(){
        return(
            // <Link to={`/spaces/${this.props.space.id}`}>
            <Card raised fluid as={Link} to={`/spaces/${this.props.space.id}`}>
                <div className="rate-div"><h3>${this.props.space.daily_rate} daily</h3></div>
                <Image className="card-img" src={this.props.space.img_url} />
                <Card.Content>
                <Card.Header>{this.props.space.name}</Card.Header>
                <Card.Description>{this.props.space.city}, {this.props.space.state}</Card.Description>
                </Card.Content>
            </Card>
            // </Link>
        )
    }
}

export default SpaceCard