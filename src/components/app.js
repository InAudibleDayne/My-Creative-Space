import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import Header from './Header/header';
import Title from './Header/title';
import BlogContainer from './Blog/blogContainer';
import Login from './Auth/login';
import Icons from "../Helpers/icons";


export default class App extends Component {
  constructor(props) {
    super(props)

    Icons(); 

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }
  }
  render() {
    return (
      <div className='app'>
        <Router>
          <Title />
          <Header />
          <Route exact path='/' component={BlogContainer} />
          <Route exact path='/login' component={Login} />
        </Router>
      </div>
    );
  }
}
