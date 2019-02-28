import React from 'react'
import { Card, Header, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class BookedCard extends React.Component{
    
    render(){
        return(
            // <Link to={`/spaces/${this.props.space.id}`}>
            <Card raised fluid as={Link} to={`/spaces/${this.props.space.id}`}>
                <div className="rate-div">
                   
                    <Icon title="Edit Booking" align="right" size="large" name="edit"/>
                    <Icon title="Contact Host" size="large" name="mail"/>
                    <Icon title="Cancel Booking" size="large" name="cancel"/>
                </div>
                <Image className="card-img" size="medium" src={this.props.space.img_url} />
                <Card.Content>
                <Card.Header>{this.props.space.name}</Card.Header>
                {/* <Card.Description>{this.props.space.city}, {this.props.space.state}</Card.Description> */}
                <Card.Description>
                    <Header>
                        <Icon title="Days Booked" color="grey" inverted circular size="large" name="calendar check"/> 2
                    </Header>
                    </Card.Description>
                </Card.Content>
            </Card>
            // </Link>
        )
    }
}

const mapStateToProps = state => {
    return {
        bookings: state.user_bookings
    }
}

export default connect(mapStateToProps)(BookedCard)