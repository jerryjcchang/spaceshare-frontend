import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Image, Container, Segment, Button, Grid, Menu } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import { bookingSpace } from '../redux/actionCreator'

class SpaceView extends React.Component {

    state = {
        startDate: "",
        endDate: "",
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
            }
        } else {
            alert('You must be logged in to reserve a space')
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
                    <Image raised centered size="large" src={this.props.space.img_url}></Image>
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
                                    <Menu secondary>
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
        // currentUserID: state.currentUser.id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        bookingSpace: (info) => {dispatch(bookingSpace(info))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpaceView)