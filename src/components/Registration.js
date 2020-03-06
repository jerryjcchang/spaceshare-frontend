import React from "react";
import { Form, Grid, Header, Segment, Message } from "semantic-ui-react";
import { statesOptions } from "../StatesData";
import { connect } from "react-redux";
import { registerUser } from "../redux/actionCreator";
import { warning } from "./Alerts";
import { debounce } from "lodash";

class Registration extends React.Component {
  componentDidMount() {
    document.querySelector("body").classList.add("register");
    setTimeout(() => {
      let newFormState = {};
      const formFields = document.querySelector(".reg-form").children;
      for (let i = 0; i < formFields.length - 1; i++) {
        let field = formFields[i].firstChild.firstChild;
        let name = field.name;
        let value = field.value;
        if (value) {
          newFormState[name] = value;
        }
      }
      this.setState({ form: { ...this.state.form, ...newFormState } });
    }, 200);
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
      city: ""
    },
    showError: false,
    validEmail: true,
    passwordMatch: true
  };

  validateEmail = email => {
    const re = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return re.test(email);
  };

  validatePassword = password => {
    return password === this.state.form.password;
  };

  handleChange = debounce((e, data) => {
    let newState = { ...this.state, form: { ...this.state.form } };
    newState.form[data.name] = data.value;
    if (data.name === "email") {
      newState.validEmail = this.validateEmail(data.value);
    }
    if (data.name.includes("password")) {
      newState.passwordMatch = this.validatePassword(data.value);
    }
    this.setState(newState);
  }, 200);

  handleRegister = e => {
    const { validEmail, passwordMatch, form } = this.state;
    const info = {
      user: this.state.form
    };
    debugger;
    let formValues = Object.values(this.state.form);
    formValues.splice(3, 1);
    if (!formValues.includes("") && validEmail && passwordMatch) {
      this.props.registerUser(info);
      this.props.routeProps.history.push("/login");
    } else {
      warning();
      this.setState({ showError: true });
    }
  };

  render() {
    const { validEmail, passwordMatch, showError, form } = this.state;
    const {
      firstName,
      lastName,
      company,
      password,
      passwordConfirm,
      city,
      selectedState
    } = form;
    console.log(!validEmail);

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
