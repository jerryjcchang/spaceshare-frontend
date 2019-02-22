import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Registration extends React.Component {

    state = {
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        password: "",
        passwordConfirm: "",
        city: "",
        phone: ""
    }

    render(){
        return(
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
                {/* <Header as='h2' textAlign='center'>
                <div className="reg-header">Register</div>
                </Header> */}
                <Form size='large'>
                  <Segment stacked className="reg-form">
                    <Form.Input fluid placeholder='E-mail address'
                    onChange={e => this.setState({email: e.target.value})} />
                    <Form.Input fluid placeholder='First Name' 
                    onChange={e => this.setState({firstName: e.target.value})} />
                    <Form.Input fluid placeholder='Last Name' 
                    onChange={e => this.setState({lastName: e.target.value})} />
                    <Form.Input fluid placeholder='City' 
                    onChange={e => this.setState({city: e.target.value})} />
                    <Form.Input fluid placeholder='Company' 
                    onChange={e => this.setState({company: e.target.value})} />
                    <Form.Input fluid placeholder='Password' type='password' 
                    onChange={e => this.setState({password: e.target.value})} />
                    <Form.Input fluid placeholder='Confirm' type='password' 
                    onChange={e => this.setState({passwordConfirm: e.target.value})} />
        
                    <Button color='blue' fluid size='large'>
                      Register
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  New to us? <a href='#'>Sign Up</a>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        )
    }
}

export default Registration
