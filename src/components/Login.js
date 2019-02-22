import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Login extends React.Component {

    state = {
        currentUser: "",
        email: "",
        password: ""
    }

    componentDidMount(){
        let token = localStorage.getItem('token')
        if(token){
            fetch('http://localhost:3001/api/v1/profile', {
                method: "GET",
                headers: {
                    "Authentication": `Bearer ${token}`
                }
            })
            .then(r => r.json())
            .then(data => {
                this.setState({
                    currentUser: data
                })
            })
        }
    }

    handleLoginSubmit = () => {
        if(!this.state.currentUser){
        fetch('http://localhost:3001/api/v1/login', {
	        method: "POST",
	        headers: {
                "Content-Type":"application/json", 
                "Accept":"application/json"},
	        body: JSON.stringify({
	    	    email: this.state.email,
		        password: this.state.password
    	    })
        })
        .then(res => res.json())
        .then(data => {
              if(data.error){ 
                alert('Incorrect username or password')
              } else {
                this.setState({
                    currentUser: data.user,
                })
                localStorage.setItem("token", data.token)
              }
            // data.error ? 
            // alert('Incorrect username or password') 
            // : 
            // // this.setState({currentUser:data.user})
            // console.log(data)
          })
        } else {
            this.setState({
                currentUser: ""
            })
            localStorage.clear()
        }
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
                <Header as='h2' color='blue' textAlign='center'>
                  <Image src='/logo_transparent.png' /> {this.state.currentUser? `Hello ${this.state.currentUser.first_name}`: `Log-in to your account`}
                </Header>
                <Form onSubmit={this.handleLoginSubmit} size='large'>
                  <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' 
                      onChange={(e)=> this.setState({ email: e.target.value})}/>
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      onChange={(e) => this.setState({ password: e.target.value})}
                    />
                    {
                    !this.state.currentUser?
                    <Button color='blue' fluid size='large'>
                      Login
                    </Button>
                    :
                    <Button color='red' fluid size='large'>
                      Logout
                    </Button>
                    }
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

export default Login