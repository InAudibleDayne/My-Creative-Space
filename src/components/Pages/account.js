import React, { Component } from 'react';
import Header from '../Header/header';
import BlogModal from '../Blog/blogModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class AccountPage extends Component {
  constructor(props){
      super(props);

      this.state = {
        search: '',
        blogModalIsOpen: false
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleLogout = this.handleLogout.bind(this)
      this.handleNewBlogClick = this.handleNewBlogClick.bind(this)
      this.handleModalClose = this.handleModalClose.bind(this)
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
  
  handleNewBlogClick() {
    this.setState({
        blogModalIsOpen: true
    });
  }

  handleModalClose() {
    this.setState({
      blogModalIsOpen: false
    })
  }

  render() {
    return (
        <div>
            <BlogModal 
            handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
            modalIsOpen={this.state.blogModalIsOpen} 
            handleModalClose={this.handleModalClose}
            />
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
            <div className="new-blog-link">
              <a onClick={this.handleNewBlogClick}>
                  <FontAwesomeIcon icon="plus-circle" />
              </a>
            </div>
        </div>
    );
  }
}