import React, { Component } from 'react';
import Header from '../Header/header';
import BlogModal from '../Blog/blogModal';
import BlogItem from '../Blog/blogItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default class AccountPage extends Component {
  constructor(props){
      super(props);

      this.state = {
        search: '',
        blogModalIsOpen: false,
        blogItems: [],
        currentPage: 0,
        totalCount: 0,
        stopQuery: false
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleLogout = this.handleLogout.bind(this)
      this.handleNewBlogClick = this.handleNewBlogClick.bind(this)
      this.handleModalClose = this.handleModalClose.bind(this)
      this.getBlogItems = this.getBlogItems.bind(this)
      this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this)
      this.handleDeleteClick = this.handleDeleteClick.bind(this)
      this.filterResults = this.filterResults.bind(this)
      this.onScroll = this.onScroll.bind(this)
      window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillMount() {
    this.getBlogItems(0)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  getBlogItems(offset, filter = null) {
    if(filter){
      axios
          .get(`http://localhost:5000/blogs/user/${this.props.userId}/${filter}/${offset}`
          ).then(response => {
            if(this.state.totalCount === 0){
              this.setState({
                blogItems: response.data,
                totalCount: offset + response.data.length,
                isLoading: false
            });
            } else {
              if(response.data.length < 10){
                this.setState({
                  blogItems: this.state.blogItems.concat(response.data),
                  totalCount: 0,
                  isLoading: false,
                  currentPage: 0,
                  stopQuery: true
              });
              } else {
                this.setState({
                    blogItems: this.state.blogItems.concat(response.data),
                    totalCount: offset + response.data.length,
                    isLoading: false
                });
              }
            }
      }).catch(error => {
          console.log("getBlogItems error", error);
      });
    } else {
      axios
        .get(`http://localhost:5000/blogs/user/${this.props.userId}/${offset}`
        ).then(response => {
          if(this.state.totalCount === 0){
            this.setState({
              blogItems: response.data,
              totalCount: offset + response.data.length,
              isLoading: false
          });
          } else {
            if(response.data.length < 10){
              this.setState({
                blogItems: this.state.blogItems.concat(response.data),
                totalCount: 0,
                isLoading: false,
                currentPage: 0,
                stopQuery: true
            });
            } else {
              this.setState({
                  blogItems: this.state.blogItems.concat(response.data),
                  totalCount: offset + response.data.length,
                  isLoading: false
              });
            }
          }
        }).catch(error => {
          console.log("getBlogItems error", error);
        });
    }
  }

  filterResults = (activeFilter) => {
    this.setState({
      stopQuery: false,
      totalCount: 0
    })
    if(activeFilter === 'all') {
      this.setState({
        filter: null
      })
      this.getBlogItems(0)
    } else {
      this.setState({
        filter: activeFilter
      })
      this.getBlogItems(0, activeFilter)
    }
  }

  onScroll() {
    if (
        this.state.isLoading
    ) {
        return;
    }

    if (this.state.stopQuery) { 
      return; 
    }

    if ((window.innerHeight + document.documentElement.scrollTop) === document.body.scrollHeight) {
      this.setState({
        currentPage: this.state.currentPage + 1
      })
      this.getBlogItems(this.state.totalCount, this.state.filter);
    }
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

  handleDeleteClick(blog) {
    axios.delete(
      `http://localhost:5000/blog/${blog.id}`
      ).then(response => {
          this.setState({
              blogItems: this.state.blogItems.filter(blogItem => {
                  return blog.id !== blogItem.id;
              })
          });

          return response.data;
      }).catch(error => {
          console.log("Error from Blog delete", error);
      });
  }

  handleSuccessfulNewBlogSubmission(blog) {
    this.setState({
        blogModalIsOpen: false,
        blogItems: [blog].concat(this.state.blogItems)
    });
  }

  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      if (this.props.loggedInStatus === "LOGGED_IN"){
          return <div key={blogItem.id} className="admin-blog-wrapper">
              <BlogItem blogItem={blogItem} />
              <a onClick={() => this.handleDeleteClick(blogItem)}>
                  <FontAwesomeIcon icon="trash" />
              </a>
          </div>
      } else {
          return <BlogItem key={blogItem.id} blogItem={blogItem} />;
      }
  });
    return (
        <div>
            <BlogModal 
            handleSuccessfulNewBlogSubmission={this.handleSuccessfulNewBlogSubmission}
            modalIsOpen={this.state.blogModalIsOpen} 
            handleModalClose={this.handleModalClose}
            userId={this.props.userId}
            />
            <Header 
            currentPage='ACCOUNT' 
            firstName={this.props.firstName} 
            loggedInStatus={this.props.loggedInStatus} 
            filters={this.filterResults}
            handleLogout={this.handleLogout}
            />
            <div className="search-wrapper">
              <input 
                name="search"
                type='text'
                placeholder="Search my blogs"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </div>
            <div className="new-blog-link">
              <a onClick={this.handleNewBlogClick}>
                  <FontAwesomeIcon icon="plus-circle" />
              </a>
            </div>

            <div className="content-container">
                {blogRecords}
            </div>
        </div>
    );
  }
}