import React from "react";
import { connect } from "react-redux";
import {
  Image,
  Container,
  Segment,
  Button,
  Menu,
  Popup,
  Confirm
} from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import {
  bookingSpace,
  setStartDate,
  setEndDate,
  clearStartDate,
  clearEndDate,
  cancelEdit,
  updatingBooking,
  setReferrer
} from "../redux/actionCreator";
import Map from "./Map";
import BookingDiv from "./BookingDiv";
import moment from "moment";
import Swal from "sweetalert2";

class SpaceView extends React.Component {
  state = {
    startDate: "",
    endDate: "",
    oldBookingDays: "",
    confirmOpen: false,
    confirmContent: ""
  };

  componentWillUnmount() {
    this.props.cancelEdit();
  }

  handleEndDate = () => {
    return this.props.editing ? this.props.end : this.state.endDate;
  };

  setBookings = () => {
    if (this.props.bookings) {
      let bookings = this.props.bookings.filter(
        booking => this.props.space_id === booking.space.id
      );
      return bookings ? bookings : [];
    } else {
      return [];
    }
  };

  handleChange = (event, { name, value }) => {
    if (name === "startDate") {
      this.props.setStartDate(moment(value).format("YYYY-MM-DD"));
    }
    if (name === "endDate") {
      this.props.setEndDate(moment(value).format("YYYY-MM-DD"));
    }
  };

  handleReserveButton = () => {
    var moment = require("moment");
    moment().format();
    // debugger
    if (this.props.user) {
      if (this.props.user)
        if (!this.props.start || !this.props.end) {
          Swal.fire({
            text: "You must select a START and END date.",
            icon: "warning"
          });
        } else {
          let info = {
            space_id: this.props.space.id,
            start: this.props.start,
            end: this.props.end
          };
          this.props.bookingSpace(info);
          if (this.props.user.reward) {
          }
        }
    } else {
      Swal.fire({
        title: "Please Register or Log In",
        text: "You must be logged in to book a space.",
        icon: "warning",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: "lightseagreen",
        cancelButtonColor: "grey",
        confirmButtonText: "Log In",
        cancelButtonText: "Back"
      }).then(result => {
        if (result.value) {
          let arr = window.location.href.split("/");
          let path = `${arr[arr.length - 2]}/${arr[arr.length - 1]}`;
          this.props.setReferrer(path);
          this.props.routeProps.history.push("/login");
        }
      });

      // this.props.routeProps.history.push('/login')
    }
  };

  handleOnConfirm = () => {
    if (
      this.state.confirmContent === "You must be logged in to reserve a space"
    ) {
      this.props.routeProps.history.push("/login");
    } else {
      this.close();
    }
  };

  toggleReserveEditButton = () => {
    if (this.props.editing) {
      document.getElementById("booking-menu").classList.add("highlight");
      return (
        <Menu.Item>
          <Button onClick={this.handleUpdateBooking} color="teal">
            Update
          </Button>
          <Button onClick={this.handleCancelEdit} className="edit-back">
            Back
          </Button>
        </Menu.Item>
      );
    } else {
      if (document.getElementById("booking-menu")) {
        document.getElementById("booking-menu").classList.remove("highlight");
      }
      return (
        <Menu.Item>
          <Button primary onClick={this.handleReserveButton}>
            Reserve
          </Button>
        </Menu.Item>
      );
    }
  };

  handleCancelEdit = () => {
    this.props.cancelEdit();
    this.setState({
      oldBookingDays: ""
    });
    if (document.getElementById("booking-menu")) {
      document.getElementById("booking-menu").classList.remove("highlight");
    }
  };

  handleClickStart = () => {
    this.props.clearEnd();
    const bookings = this.setBookings();
    if (bookings !== []) {
      if (bookings.length === 1) {
        let bookingArr = bookings[0].dates;
        // debugger
        let parsedBookingDates = bookingArr.map(date =>
          moment(date).format("MMM-DD-YYYY")
        );
        this.setState({ bookedDates: parsedBookingDates });
      } else {
        // take bookings array and map booking dates
        let bookingsDatesArr = bookings.map(booking => booking.dates);
        let bookingArr = [].concat.apply([], bookingsDatesArr);
        let uniqueBookingDates = bookingArr.filter(
          (v, i, a) => a.indexOf(v) === i
        );
        let parsedBookingDates = uniqueBookingDates.map(date =>
          moment(date).format("MMM-DD-YYYY")
        );
        this.setState({ bookedDates: parsedBookingDates });
      }
    }
  };

  allBookings = () => {
    let bookings = this.setBookings();
    if (bookings.length > 0) {
      // debugger
      return bookings
        .sort(function(a, b) {
          return moment(a.start) - moment(b.start);
        })
        .map(booking => <BookingDiv key={booking.id} booking={booking} />);
    }
  };

  showStart = () => {
    return this.props.start
      ? moment(this.props.start).format("MMM-DD-YYYY")
      : "";
  };

  showEnd = () => {
    return this.props.end ? moment(this.props.end).format("MMM-DD-YYYY") : "";
  };

  handleUpdateBooking = () => {
    let info = {
      id: this.props.id,
      start: this.props.start,
      end: this.props.end,
      old_days: this.props.oldDays
    };
    this.props.updateBooking(info);
    document.getElementById("booking-menu").classList.remove("highlight");
  };

  handleDailyRate = () => {
    if (!this.props.user.reward) {
      return <h2>Daily Rate: ${this.props.space.daily_rate}</h2>;
    } else {
      return (
        <h2 id="discount">
          Daily Rate: <strike>${this.props.space.daily_rate}</strike> $
          {this.props.space.daily_rate - 15}
        </h2>
      );
    }
  };

  close = () => {
    this.setState({ confirmOpen: false });
  };

  render() {
    return (
      <body className="space-page">
        {!this.props.space ? null : (
          <div className="space-page">
            <Container className="space-page">
              <Image centered size="big" src={this.props.space.img_url}></Image>
              <Container className="space-details">
                <h1>{this.props.space.name}</h1>
                <Segment.Group>
                  <Segment id="map-container">
                    <Map space={this.props.space} />
                  </Segment>
                  <Segment align="left">
                    <span>
                      <b>Address:</b> {this.props.space.street_address}{" "}
                    </span>
                    {/* <span>{`${this.props.space.city}, ${this.props.space.state} ${this.props.space.zip}`}</span>       */}
                  </Segment>
                  <Segment align="left">
                    <span>
                      <b>Description:</b> {this.props.space.description}
                    </span>
                  </Segment>
                  <Segment align="left" id="amenities-div">
                    <div>
                      <b>Amenities:</b>
                    </div>
                    <div id="space-icons-div">
                      {this.props.space.features.map((feature, index) => (
                        <Popup
                          content={feature.name}
                          key={index}
                          trigger={
                            <Image
                              size="small"
                              key={index}
                              id="feature-icon"
                              spaced="left"
                              inline
                              src={feature.img_url}
                            />
                          }
                        />
                      ))}
                    </div>
                  </Segment>
                  <Segment className="booking-menu" id="booking-menu">
                    <Menu stackable secondary>
                      <Menu.Item>Start</Menu.Item>
                      <Menu.Item>
                        <DateInput
                          name="startDate"
                          placeholder="Date"
                          value={this.showStart()}
                          iconPosition="left"
                          onChange={this.handleChange}
                          minDate={moment().format("MMM-DD-YYYY")}
                          dateFormat="MMM-DD-YYYY"
                          closable
                          disable={this.state.bookedDates}
                          onClick={this.handleClickStart}
                          clearable
                          onClear={this.props.clearStart}
                        />
                      </Menu.Item>
                      <Menu.Item>End</Menu.Item>
                      <Menu.Item>
                        <DateInput
                          name="endDate"
                          placeholder="Date"
                          value={this.showEnd()}
                          iconPosition="left"
                          onChange={this.handleChange}
                          closable
                          dateFormat="YYYY-MM-DD"
                          minDate={this.props.start}
                          initialDate={this.props.start}
                          disable={this.state.bookedDates}
                          clearable
                          onClear={this.props.clearEnd}
                        />
                      </Menu.Item>
                      {this.toggleReserveEditButton()}
                      <Menu.Item position="right">
                        {this.handleDailyRate()}
                      </Menu.Item>
                    </Menu>
                  </Segment>
                </Segment.Group>
              </Container>
              {this.setBookings().length > 0 ? (
                <Container className="bookings">
                  <h1>My Bookings</h1>
                  <Segment.Group className="bookings">
                    {this.allBookings()}
                  </Segment.Group>
                </Container>
              ) : null}
              <Confirm
                content={this.state.confirmContent}
                dimmer="inverted"
                open={this.state.confirmOpen}
                onCancel={this.close}
                onConfirm={this.handleOnConfirm}
                confirmButton={
                  this.state.confirmContent.includes("logged in")
                    ? "Login"
                    : "Ok"
                }
                cancelButton="Back"
                header=""
                size="tiny"
              ></Confirm>
            </Container>

            {/* </div> */}
          </div>
        )}
      </body>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.currentUser,
    allSpaces: state.allSpaces,
    routeProps: ownProps.routeProps,
    space: state.allSpaces.find(
      space => space.id === parseInt(ownProps.routeProps.match.params.id)
    ),
    bookings: state.userBookings,
    space_id: parseInt(ownProps.routeProps.match.params.id),
    editing: state.bookingForm.editing,
    start: state.bookingForm.start,
    end: state.bookingForm.end,
    id: state.bookingForm.id,
    oldDays: state.bookingForm.days
  };
};

const mapDispatchToProps = dispatch => {
  return {
    bookingSpace: info => {
      dispatch(bookingSpace(info));
    },
    setStartDate: start => {
      dispatch(setStartDate(start));
    },
    setEndDate: end => {
      dispatch(setEndDate(end));
    },
    clearStart: () => {
      dispatch(clearStartDate());
    },
    clearEnd: () => {
      dispatch(clearEndDate());
    },
    cancelEdit: () => {
      dispatch(cancelEdit());
    },
    updateBooking: info => {
      dispatch(updatingBooking(info));
    },
    setReferrer: url => {
      dispatch(setReferrer(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpaceView);
