import React, { Component } from 'react';
import Header from '../Header/header';

export default class AccountPage extends Component {
  render() {
    return (
        <div>
            <Header currentPage='ACCOUNT_PAGE' />
            <h1>Something to read</h1>
        </div>
    );
  }
}