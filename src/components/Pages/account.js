import React, { Component } from 'react';
import Header from '../Header/header';

export default class AccountPage extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
        <div>
            <Header currentPage='ACCOUNT' firstName={this.props.firstName} loggedInStatus={this.props.loggedInStatus}/>
            <h1>Something to read</h1>
        </div>
    );
  }
}