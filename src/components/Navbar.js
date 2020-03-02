import React from "react";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loggingOut } from "../redux/actionCreator";
import Swal from "sweetalert2";

class Navbar extends React.Component {
  state = {
    hover: false
  };

  handleWelcomeDiv = () => {
    return (
      <div style={{ display: "flex" }}>
        <img id="avatar" src={this.props.user.img_url} alt="user avatar" />
        <div id="user-div" style={{ marginLeft: "1vw" }}>
          {!this.state.hover
            ? `${this.props.user.first_name}`
            : `SpacePoints: ${this.props.user.points.toLocaleString()}`}
        </div>
      </div>
    );
  };

  handleLogOut = () => {
    Swal.fire({
      title: "Confirm Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "lightseagreen",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(result => {
      if (result.value) {
        this.props.logOut();
        Swal.fire("Goodbye!", "You have successfully logged out.", "success");
      }
    });
  };

  render() {
    return (
      <Menu
        fitted="vertically"
        fixed="top"
        className="navbar"
        inverted
        compact
        borderless
      >
        <Menu.Item position="left">
          <Image
            src="/logo_transparent.png"
            size="tiny"
            as={Link}
            to="/spaces"
            alt="spaceshare logo"
          />
          {this.props.user && this.props.windowWidth > 812 ? (
            <span
              onClick={() => {
                this.setState({ hover: !this.state.hover });
              }}
              // onMouseLeave={()=>{this.setState({hover: !this.state.hover})}}
              className="user-welcome"
            >
              {this.handleWelcomeDiv()}
            </span>
          ) : null}
        </Menu.Item>
        <Menu.Item position="right">
          <h3>About</h3>
        </Menu.Item>
        {this.props.user ? (
          <Menu.Item id="profile-div" as={Link} to="/profile">
            <h3>My Profile</h3>
          </Menu.Item>
        ) : null}
        {this.props.user ? (
          <Menu.Item onClick={this.handleLogOut} as={Link} to="/spaces">
            <h3>Log Out</h3>
          </Menu.Item>
        ) : (
          <Menu.Item as={Link} to="/login">
            <h3>Log In</h3>
          </Menu.Item>
        )}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    windowWidth: state.windowWidth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => {
      dispatch(loggingOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
