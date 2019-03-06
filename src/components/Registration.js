import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Dropdown } from 'semantic-ui-react'
import { reactStatesData } from '../StatesData'
import { connect } from 'react-redux'
import { registerUser } from '../redux/actionCreator'

class Registration extends React.Component {

    state = {
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        password: "",
        passwordConfirm: "",
        city: "",
        phone: "",
    }

    handleRegister = () => {
      const {email, firstName, lastName, company, password, passwordConfirm, city, phone} = this.state
      const info = {
        user: {
        email,
        first_name: firstName,
        last_name: lastName,
        company,
        password,
        password_confirm: passwordConfirm,
        city,
        phone,}
      }
      // debugger
      this.props.registerUser(info)
      this.props.routeProps.history.push('/login')
    }

    handleDisable = () => {
      return(
        !this.state.email ||
        !this.state.firstName ||
        !this.state.lastName ||
        !this.state.company ||
        !this.state.password ||
        !this.state.confirmPassword ||
        !this.state.city
      )
    }

    render(){
        return(
          <body className="register">
            <div className='login-form'>
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
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' textAlign='center' style={{color: "white"}}>
                <div className="reg-header">Sign Up</div>
                </Header>
                <Form onSubmit={this.handleRegister}size='large'>
                  <Segment stacked className="reg-form">
                    <Form.Input fluid icon="mail" placeholder='E-mail address'
                      onChange={e => this.setState({email: e.target.value})} />
                    <Form.Input fluid placeholder='First Name' 
                      onChange={e => this.setState({firstName: e.target.value})} />
                    <Form.Input fluid placeholder='Last Name' 
                      onChange={e => this.setState({lastName: e.target.value})} />
                    <Form.Input fluid placeholder='City' 
                      onChange={e => this.setState({city: e.target.value})} />
                    <Form.Dropdown search selection clearable options={reactStatesData} fluid placeholder='State'
                      onChange={e => this.setState({state: e.target.value})} />
                    <Form.Input fluid placeholder='Company' 
                      onChange={e => this.setState({company: e.target.value})} />
                    <Form.Input fluid icon="lock" placeholder='Password' type='password' 
                      onChange={e => this.setState({password: e.target.value})} />
                    <Form.Input fluid icon="lock" placeholder='Confirm' type='password' 
                      onChange={e => this.setState({passwordConfirm: e.target.value})} />
                    <Form.Input fluid icon="phone" placeholder='(987) 654-3210'
                      onChange={e => this.setState({phone: e.target.value})} />
                    <Form.Button color='blue' fluid size='large'
                      // disabled={this.handleDisable()}
                    >
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
          </body>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
  return{
    routeProps: ownProps.routeProps,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    registerUser: (info) => dispatch(registerUser(info))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration)
