import React, { Component } from 'react';
import Header from '../Header/header';

export default class AccountPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            search: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleChange = (event) => {
        this.setState({
          search: event.target.value
        })
      }

      handleLogout() {
        this.props.handleSuccessfulLogout();
        this.props.history.push("/");
      }

  render() {
    return (
        <div>
            <Header currentPage='ACCOUNT' firstName={this.props.firstName} loggedInStatus={this.props.loggedInStatus} handleLogout={this.handleLogout}/>
            <div className="search-wrapper">
              <input 
                name="search"
                type='text'
                placeholder="Search"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </div>
            <h1>Something to read</h1>
        </div>
    );
  }
}