import React from 'react'
import { Card, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class SpaceCard extends React.Component{
    
    promoHandler= () => {
        return(this.props.space.promo ?
            {corner: 'right', color: 'green', icon:'dollar'}
            :
            null
        ) 
    }

    render(){
        const {id,daily_rate,img_url,name,city,state,features} = this.props.space
        
        return(
            // <Link to={`/spaces/${this.props.space.id}`}>
            <Card raised fluid as={Link} to={`/spaces/${id}`}>
                <div className="rate-div"><h3>${daily_rate} daily</h3></div>
                {/* <Label color="orange" corner>Promotion</Label> */}
                <Image id="card-img" src={img_url} label={this.promoHandler()}/>
                <Card.Content id="card-content">
                <Card.Header>{name}</Card.Header>
                <Card.Description>{city}, {state}</Card.Description>
                <div id="card-features-div" align="right">{features.map(feature => <Image id="card-feature" inline src={feature.img_url}/>)}</div>
                </Card.Content>
            </Card>
            // </Link>
        )
    }
}

export default SpaceCard