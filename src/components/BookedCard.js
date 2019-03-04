import React from 'react'
import { Card, Header, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletingBooking } from '../redux/actionCreator'

class BookedCard extends React.Component{

    handleCancelBooking = () => {
        this.props.cancelBooking(this.props.booking.id)
    }
    
    render(){
        return(
            // <Link to={`/spaces/${this.props.space.id}`}>
            <Card raised fluid as={Link} to={`/spaces/${this.props.booking.space.id}`}>
                <div className="rate-div">
                   <h3>{this.props.booking.space.name}</h3>
                </div>
                <Image className="card-img" src={this.props.booking.space.img_url} />
                <Card.Content>
                {/* <Card.Header>{this.props.booking.space.name}</Card.Header> */}
                {/* <Card.Description>{this.props.space.city}, {this.props.space.state}</Card.Description> */}
                <Card.Description>
                    <Header>
                        <Icon title="Days Booked" color="grey" inverted circular size="large" name="calendar check"/>Bookings: {this.props.booking.dates.length}
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
        bookings: state.userBookings,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        cancelBooking: (info) => {dispatch(deletingBooking(info))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookedCard)