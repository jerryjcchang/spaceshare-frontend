import React from "react";
import { connect } from "react-redux";
import { Container, Image, Card, Segment, Button } from "semantic-ui-react";
import BookedCard from "./BookedCard";
import { redeemingReward } from "../redux/actionCreator";

class Profile extends React.Component {
  uniqueBookings = () => {
    let uniqueBookings = [];
    this.props.bookings.filter(booking => {
      let i = uniqueBookings.findIndex(x => x.space.id === booking.space.id);
      if (i <= -1) {
        uniqueBookings.push(booking);
      }
      return null;
    });
    console.log(uniqueBookings);
    debugger;
  };

  handleRedeem = () => {
    this.props.redeem();
  };

  render() {
    return (
      <body className="profile">
        {!this.props.user ? null : (
          <Container className="profile">
            <Image
              circular
              size="small"
              centered
              src={this.props.user.img_url}
            />
            <h1>{`${this.props.user.first_name} ${this.props.user.last_name}`}</h1>
            <Segment>
              <h1>SpacePoints: {this.props.user.points.toLocaleString()}</h1>
              <Button
                onClick={this.handleRedeem}
                color="green"
                size="large"
                disabled={this.props.user.points < 10000}
              >
                Redeem for $15!
              </Button>
            </Segment>
            <h3>My Bookings</h3>
            <Card.Group itemsPerRow="4" stackable doubling>
              {this.props.bookings.map(booking => (
                <BookedCard booking={booking} />
              ))}
            </Card.Group>
          </Container>
        )}
      </body>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    bookings: state.userBookings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    redeem: () => {
      dispatch(redeemingReward());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
