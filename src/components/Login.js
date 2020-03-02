import React from "react";
import { Button, Form, Grid, Image, Message, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { loggingInUser, loggingOut } from "../redux/actionCreator";
import { withRouter, Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    currentUser: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    let body = document.querySelector("body");
    body.classList.remove("home");
    body.classList.add("login");
    let token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/api/v1/profile", {
        method: "GET",
        headers: {
          Authentication: `Bearer ${token}`
        }
      })
        .then(r => r.json())
        .then(data => {
          this.setState({
            currentUser: data.user
          });
          console.log(data);
        });
    }
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWndowDimensions);
  }

  componentWillUnmount() {
    let body = document.querySelector("body");
    body.classList.remove("login");
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  handleLoginSubmitRedux = () => {
    let info = {
      email: this.state.email,
      password: this.state.password
    };
    if (!this.props.currentUser) {
      this.props.loggingInUser(info);
    } else {
      this.props.logOut();
      localStorage.clear();
    }
  };

  // handleLoginSubmitReact = () => {
  //     if(!this.state.currentUser){
  //     fetch('http://localhost:3001/api/v1/login', {
  //       method: "POST",
  //       headers: {
  //             "Content-Type":"application/json",
  //             "Accept":"application/json"},
  //       body: JSON.stringify({
  //   	    email: this.state.email,
  //         password: this.state.password
  // 	    })
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //         console.log(data)
  //           if(data.error){
  //             alert('Incorrect username or password')
  //           } else {
  //             this.setState({
  //                 currentUser: data.user_info.user,
  //             })
  //             localStorage.setItem("token", data.token)
  //           }
  //       })
  //     } else {
  //         this.setState({
  //             currentUser: ""
  //         })
  //         localStorage.clear()
  //     }
  // }

  render() {
    return (
      <div className="login-form">
        {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
        <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Image
              id="logo"
              centered
              size="large"
              src="/logo_transparent.png"
            />
            {/* <Header className="login-header" as='h1' textAlign='center'>
                  {this.props.currentUser? `Welcome ${this.props.currentUser.first_name}`: null}
                </Header> */}
            <Form onSubmit={this.handleLoginSubmitRedux} size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                {!this.props.currentUser ? (
                  <Button color="blue" fluid size="large">
                    Login
                  </Button>
                ) : (
                  <Button color="red" fluid size="large">
                    Logout
                  </Button>
                )}
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/register">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loggingInUser: info => {
      dispatch(loggingInUser(info));
    },
    logOut: () => {
      dispatch(loggingOut());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
