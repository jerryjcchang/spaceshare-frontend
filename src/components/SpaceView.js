import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Image, Container, Segment, Button, Grid, Menu } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'

class SpaceView extends React.Component {

    state = {
        startDate: "",
        endDate: ""
    }

    handleClick = () => {
        console.log(this.props.space.name)
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
                                    <span><b>Address:</b>{this.props.space.street_address} </span>
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
                                            dateFormat="MM-DD-YYYY"
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
                                            dateFormat="MM-DD-YYYY"
                                            minDate={this.state.startDate}
                                        />
                                        </Menu.Item>
                                        <Menu.Item><Button primary>Reserve</Button></Menu.Item>
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
        allSpaces: state.allSpaces,
        routeProps: ownProps.routeProps,
        space: state.allSpaces.find(space => space.id === parseInt(ownProps.routeProps.match.params.id)),
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpaceView)