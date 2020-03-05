import React from "react";
import { Form, Grid, Header, Segment, Message } from "semantic-ui-react";
import { statesOptions } from "../StatesData";
import { connect } from "react-redux";
import { registerUser } from "../redux/actionCreator";
import { warning } from "./Alerts";
import _, { debounce } from "lodash";

class Registration extends React.Component {
  componentDidMount() {
    document.querySelector("body").classList.add("register");
  }

  componentWillUnmount() {
    document.querySelector("body").classList.remove("register");
  }

  state = {
    form: {
      email: "",
      firstName: "",
      lastName: "",
      company: "",
      password: "",
      passwordConfirm: "",
      city: "",
      phone: ""
    },
    showError: false,
    validEmail: true,
    passwordMatch: true
  };

  validateEmail = email => {
    const re = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    let validate = re.test(email);
    this.setState({ validEmail: validate });
  };

  validatePassword = password => {
    if (password !== this.state.form.password) {
      this.setState({ passwordMatch: false });
    } else {
      this.setState({ passwordMatch: true });
    }
  };

  handleChange = debounce((e, data) => {
    let newState = { ...this.state.form };
    newState[data.name] = data.value;
    if (data.name === "email") {
      this.validateEmail(data.value);
    }
    if (data.name.includes("password")) {
      this.validatePassword(data.value);
    }
    this.setState({ form: newState });
  }, 200);

  handleRegister = e => {
    const { validEmail, passwordMatch } = this.state;
    const info = {
      user: this.state.form
    };
    // debugger
    if (
      !Object.values(this.state.form).includes("") &&
      validEmail &&
      passwordMatch
    ) {
      this.props.registerUser(info);
      this.props.routeProps.history.push("/login");
    } else {
      warning();
      this.setState({ showError: true });
    }
  };

  render() {
    const { email, validEmail, passwordMatch, showError, form } = this.state;
    const {
      firstName,
      lastName,
      company,
      password,
      passwordConfirm,
      city,
      selectedState,
      phone
    } = form;
    return (
      <div id="registration-form">
        <Grid
          textAlign="center"
          style={{ height: "40%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center" style={{ color: "white" }}>
              <div className="reg-header">Sign Up</div>
            </Header>
            <Form onSubmit={this.handleRegister} size="tiny" id="reg-form">
              <Segment stacked className="reg-form">
                <Form.Input
                  fluid
                  icon="mail"
                  placeholder="E-mail address"
                  name="email"
                  onChange={this.handleChange}
                  error={!validEmail}
                />
                {!validEmail ? (
                  <Message
                    size="mini"
                    error
                    content="E-mail must be in a valid format"
                  />
                ) : null}
                <Form.Input
                  fluid
                  placeholder="First Name"
                  name="firstName"
                  onChange={this.handleChange}
                  error={showError && !firstName}
                />
                <Form.Input
                  fluid
                  placeholder="Last Name"
                  name="lastName"
                  onChange={this.handleChange}
                  error={showError && !lastName}
                />
                <Form.Input
                  fluid
                  placeholder="City"
                  name="city"
                  onChange={this.handleChange}
                  error={showError && !city}
                />
                <Form.Dropdown
                  search
                  name="selectedState"
                  selection
                  clearable
                  options={statesOptions}
                  fluid
                  placeholder="State"
                  onChange={this.handleChange}
                  error={showError && !selectedState}
                />
                <Form.Input
                  fluid
                  name="company"
                  placeholder="Company (Optional)"
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                  error={showError && !password}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  name="passwordConfirm"
                  placeholder="Confirm"
                  type="password"
                  onChange={this.handleChange}
                  error={!passwordMatch}
                />

                {!this.state.passwordMatch ? (
                  <Message
                    attached="bottom"
                    size="mini"
                    error
                    content="passwords must match"
                  />
                ) : null}

                {/* <Form.Input
                  fluid
                  icon="phone"
                  placeholder="(987) 654-3210"
                  onChange={e => this.setState({ phone: e.target.value })}
                /> */}
                <Form.Button color="blue" fluid size="large">
                  Register
                </Form.Button>
              </Segment>
            </Form>
            {/* <Message>
                  New to us? <a href='#'>Sign Up</a>
                </Message> */}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    routeProps: ownProps.routeProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: info => dispatch(registerUser(info))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
