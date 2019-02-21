import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { withCookies } from 'react-cookie';

class App extends Component {
  
  render() {
    return (
    <div className="container">
      <Switch>
        <Route exact path='/' render={() => (<Login cookies={this.props.cookies}/>)}/>
        <PrivateRoute path='/dashboard' component={Dashboard} cookies={this.props.cookies} />
      </Switch>
    </div>
    );
  }
}

//The app is “protected” against anonymous users
const PrivateRoute = ({ component: Component, cookies, ...rest }) => (
  <Route {...rest} render={(props) => (
    (cookies.get('userId'))
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)


export default withCookies(App);
