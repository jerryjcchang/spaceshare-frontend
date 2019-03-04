import React from 'react'
import { connect } from 'react-redux'
import { Container, Image, Card } from 'semantic-ui-react' 
import BookedCard from './BookedCard'

class Profile extends React.Component{

    uniqueBookings = () => {
        const uniqueBookings = []
        this.props.bookings.filter(booking => {
            let i = uniqueBookings.findIndex(x => x.space.id === booking.space.id)
            if(i <= -1){
                uniqueBookings.push(booking)
            } return null
        })
        return uniqueBookings
    }

    render(){
        return(
            <body className="profile">
            {!this.props.user ? null :
            (
            <Container className="profile">
            <Image circular size="small" centered src="https://www.freeiconspng.com/uploads/customers-icon-20.png" />    
            <h1>{`${this.props.user.first_name} ${this.props.user.last_name}`}</h1>
            <h3>Booked Spaces</h3>
            <Card.Group itemsPerRow="4">
                {this.uniqueBookings().map(booking => 
                    <BookedCard booking={booking}/>)}

            </Card.Group>
            </Container>
            )
            }
           
            </body>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        user: state.currentUser,
        bookings: state.userBookings,
    }
}

export default connect(mapStateToProps,)(Profile)