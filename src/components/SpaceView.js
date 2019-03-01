import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Image, Container, Segment, Button, Grid, Menu } from 'semantic-ui-react'
import { DateInput, DatesRangeInput } from 'semantic-ui-calendar-react'
import { bookingSpace } from '../redux/actionCreator'
// import { moment } from 'moment'

var moment = require('moment')
moment().format()

class SpaceView extends React.Component {

    moment = require('moment')

    state = {
        startDate: "",
        endDate: "",
        bookedDates: [],
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }

    handleClick = () => {
        console.log(this.props.space.name)
    }

    handleReserveButton = () => {
        var moment = require('moment')
        moment().format()
        // debugger
        if(this.props.user){
            if (!this.state.startDate || !this.state.endDate){
                alert('You must select a Start and End date')
            } else {
            let info = {
                space_id: this.props.space.id,
                start: this.state.startDate,
                end: this.state.endDate
            }
            this.props.bookingSpace(info)
            this.props.routeProps.history.push('/profile')
            }
        } else {
            alert('You must be logged in to reserve a space')
        }
    }

    blockedDates = () => {
        let t = this

            let bookings = this.props.bookings.filter(booking => this.props.space_id === booking.space.id)
            // debugger
            if(bookings !== []){
                if(bookings.length === 1){
                    let bookingArr = bookings[0].dates
                    let parsedBookingDates = bookingArr.map(date => moment(date).format('MMM-DD-YYYY'))
                    this.setState({bookedDates: parsedBookingDates})
                } else {
                    // take bookings array and map booking dates
                    let bookingsDatesArr = bookings.map(booking => booking.dates)
                    let bookingArr = [].concat.apply([],bookingsDatesArr)
                    let uniqueBookingDates = bookingArr.filter((v,i,a) => a.indexOf(v) === i)
                    let parsedBookingDates = uniqueBookingDates.map(date => moment(date).format('MMM-DD-YYYY'))
                    this.setState({bookedDates: parsedBookingDates})
                }
            }
    }

    render(){
        return(
            <body className="space-page">
            {!this.props.space ? null : (
            <div className="space-page">
                {/* <div className="view-header" onClick={this.handleClick}>{this.props.space.name}</div> */}
                {/* <div className="view-image-container"> */}
                <Container className="space-page">
                    <Image raised centered size="big" src={this.props.space.img_url}></Image>
                    <Container raised className="space-details">
                            <h1>{this.props.space.name}</h1>
                            <Segment.Group>
                                <Segment align="left">
                                    <span><b>Address:</b> {this.props.space.street_address} </span>
                                    <span>{`${this.props.space.city}, ${this.props.space.state} ${this.props.space.zip}`}</span>      
                                </Segment>                 
                                <Segment align="left">
                                    <span><b>Description:</b> {this.props.space.description}</span>
                                </Segment>
                                <Segment>
                                    {/* <Button primary>Reserve</Button> */}
                                    <Menu stackable secondary>
                                    <Menu.Item>Start</Menu.Item>
                                        <Menu.Item>
                                        <DateInput
                                            name="startDate"
                                            placeholder="Date"
                                            value={this.state.startDate}
                                            iconPosition="left"
                                            onChange={this.handleChange}
                                            dateFormat="MMM-DD-YYYY"
                                            closable
                                            disable={this.state.bookedDates}
                                            onClick={this.blockedDates}
                                        />
                                        </Menu.Item>
                                        <Menu.Item>End</Menu.Item>
                                        <Menu.Item>
                                        <DateInput
                                            name="endDate"
                                            placeholder="Date"
                                            value={this.state.endDate}
                                            iconPosition="left"
                                            onChange={this.handleChange}
                                            closable
                                            dateFormat="MMM-DD-YYYY"
                                            minDate={this.state.startDate}
                                            initialDate={this.state.startDate}
                                            disable={this.state.bookedDates}
                                            // marked={this.state.bookedDates}
                                        />
                                        </Menu.Item>
                                        <Menu.Item><Button primary onClick={this.handleReserveButton}>Reserve</Button></Menu.Item>
                                        <Menu.Item position="right"><h2>Daily Rate: ${this.props.space.daily_rate}</h2></Menu.Item>
                                        </Menu>
                                    </Segment>
                            </Segment.Group>
                    </Container>
                </Container>

                {/* </div> */}
                
            </div>
            )}
            </body>
            )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        user: state.currentUser,
        allSpaces: state.allSpaces,
        routeProps: ownProps.routeProps,
        space: state.allSpaces.find(space => space.id === parseInt(ownProps.routeProps.match.params.id)),
        bookings: state.user_bookings,
        space_id: parseInt(ownProps.routeProps.match.params.id)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        bookingSpace: (info) => {dispatch(bookingSpace(info))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpaceView)