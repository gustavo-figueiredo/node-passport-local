import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { Container } from 'semantic-ui-react';

import Header from './Header';
import Landing from './Landing';
import Login from './Login';
import Signup from './Signup';
import RequireAuthentication from './HOC/require_authentication';
//import Dashboard from './Dashboard';
//import SurveyNew from './surveys/SurveyNew';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Container>
          <Header />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={RequireAuthentication(Landing)} />
        </Container>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
