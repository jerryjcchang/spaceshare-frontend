import React from 'react'
import { Segment, Button, Icon, Confirm } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { deletingBooking, editingBooking } from '../redux/actionCreator'
import moment from 'moment'

class BookingDiv extends React.Component{

    state = {
        confirmOpen: false,
        confirm: false,
    }

    handleDeleteBooking = () => {
        this.setState({
            confirmOpen: true,
        })
    }

    handleConfirmDelete = () => {
        this.props.cancelBooking(this.props.booking.id)
        this.setState({
            confirmOpen: false
        })
    }

    close = () => {
        this.setState({confirmOpen: false})
    }

    render(){
        return(
            // <div>
            
            <Segment.Group raised horizontal className="booking-div">
                <Segment id="days-div"><Icon name="calendar" size="large"/> Days Booked: {this.props.booking.dates.length}</Segment>
                <Segment id="date-div" align="left"><Icon name="arrow alternate circle right" size="large"/> Start: {moment(this.props.booking.start).format("MMM-D-YYYY")}</Segment>
                <Segment id="date-div" align="left"><Icon name="arrow alternate circle left" size="large"/>End: {moment(this.props.booking.end).format("MMM-D-YYYY")}</Segment>
                <Segment align="right">
                    <Button onClick={() => {this.props.editBooking(this.props.booking.id, this.props.booking.start, this.props.booking.end, this.props.booking.dates.length)}}
                            color="teal" title="Edit Booking" align="right" name="edit">Edit</Button>
                    {/* <Icon color="teal" title="Contact Host" size="large" name="mail"/> */}
                    <Button onClick={this.handleDeleteBooking} 
                            color="red" title="Cancel Booking">Cancel</Button>
                </Segment>
                <Segment>
                <Confirm content="Are you sure you want to cancel this booking?" 
                     dimmer="inverted" 
                     open={this.state.confirmOpen} 
                     onCancel={this.close} 
                     onConfirm={this.handleConfirmDelete}
                     confirmButton="Yes"
                     cancelButton="Back"
                     header="Confirm Cancellation"
                     size="tiny"
            >
            </Confirm>
            </Segment>
            </Segment.Group>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cancelBooking: (info) => {dispatch(deletingBooking(info))},
        editBooking: (id, start, end, days) => {dispatch(editingBooking(id, start, end, days))},
    }
}

export default connect(null, mapDispatchToProps)(BookingDiv)