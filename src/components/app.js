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
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <Title />
          <Route exact path='/' component={BlogContainer} />
          <Route exact path='/login' component={Auth} />
          <Route exact path='/b/:slug' component={BlogDetail} />
        </Router>
      </div>
    );
  }
}
