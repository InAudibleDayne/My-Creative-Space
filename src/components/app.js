import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from './Header/header';
import Title from './Header/title';
import BlogContainer from './Blog/blogContainer';
import BlogDetail from './Blog/blogDetail';
import Icons from "../Helpers/icons";
import Auth from './Pages/auth';


export default class App extends Component {
  constructor(props) {
    super(props)

    Icons(); 

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      firstName: "",
      userId: 0
    }

    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin(firstName, userId) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      firstName: `${firstName}`,
      userId: `${userId}`
    })
    console.log(this.state.userId);
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      firstName: ""
    });
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <Title />
          <Switch>
          <Route exact path='/' render={props => (
            <BlogContainer {...props} loggedInStatus={this.state.loggedInStatus} handleSuccessfulLogout={this.handleSuccessfulLogout} firstName={this.state.firstName} />
          )} />
          <Route exact path='/login' render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )} 
                />
          <Route exact path='/b/:slug' render={props => (
            <BlogDetail {...props} loggedInStatus={this.state.loggedInStatus} handleSuccessfulLogout={this.handleSuccessfulLogout} firstName={this.state.firstName} />
          )} />
          </Switch>
        </Router>
      </div>
    );
  }
}
