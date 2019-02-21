import React, { Component } from 'react';
import { withRouter } from 'react-router'
import {Alert,Button,Form} from 'react-bootstrap'
import { compose } from 'recompose'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Login extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);    
    this.state = {
      userId: props.cookies.get('userId') || '', 
      email: '',
      password: '',
      error:'',
    };
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const { email,password } = this.state;
    const { cookies } = this.props;
    
    //if succeed, redirect to dashboard page
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': ""},
        body: `email=${email}&password=${password}`
    };

    fetch('http://neat-mvp-api.herokuapp.com/v1/auth', requestOptions)
      .then(res => {
        if(res.ok) {
          this.setState({error: '' });

          res.json().then(data => {
            cookies.set('userId', data.id, { path: '/' } );
            this.props.history.push('/dashboard');
          })     
        }
        else {
          throw new Error('Not Authorized');
        }
      })
      .catch((error) => {
        this.setState({error: 'Not Authorized' })
    });
  }


  render() {
    return (
      <div className="login-form">
        <div >
            <h1>Neat Map Login</h1>
            {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        </div>
        <Form onSubmit={this.onSubmit}>
          <Form.Control type="email" placeholder="Email" name="email" value={this.state.email}  onChange={(e) => this.setState({email : e.target.value})} />
          <br />
          <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
          <br />
          <Button type="submit" value="Sign In">Login</Button>    
        </Form>
      </div>
    );
  }
}

export default compose(
      withRouter,
      withCookies
)(Login);