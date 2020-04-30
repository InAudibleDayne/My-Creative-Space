import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../Header/header';
import BlogItem from './blogItem';
import axios from 'axios';



class BlogContainer extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      blogItems: [],
      search: '',
      currentPage: 0,
      totalCount: 0,
      isLoading: true,
      filter: null,
      stopQuery: false
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    this.searchBlogItems = this.searchBlogItems.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    this.getBlogItems(0);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  getBlogItems(offset, filter = null) {
    if(filter){
      axios
          .get(`https://my-creative-space-backend.herokuapp.com/blogs/sort/${filter}/${offset}`
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
        .get(`https://my-creative-space-backend.herokuapp.com/blogs/${offset}`
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

  search(event) {
    this.setState({
      blogItems: [],
      totalCount: 0
    });
    if(this.state.search === ''){
      this.getBlogItems(0);
      event.preventDefault();
    } else {
    this.searchBlogItems(0, this.state.search);
    event.preventDefault();
    }
  }

  searchBlogItems(offset, keywords) {
    axios
        .get(`https://my-creative-space-backend.herokuapp.com/blogs/search/${keywords}/${offset}`
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
      if(this.state.search === ''){
        this.getBlogItems(this.state.totalCount, this.state.filter);
      } else {
        this.searchBlogItems(this.state.totalCount, this.state.search);
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  handleLogout() {
    this.props.handleSuccessfulLogout();
  }
  
  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />
    })
    return (
        <div>
            <Header 
              currentPage='HOME' 
              filters={this.filterResults} 
              loggedInStatus={this.props.loggedInStatus} 
              handleLogout={this.handleLogout} 
              firstName={this.props.firstName} 
              userId={this.props.userId} 
            />
            <form onSubmit={this.search} className="search-wrapper">
              <input 
                name="search"
                type='text'
                placeholder="Search"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </form>
            <div className='content'>
                <div className='blog-container'>
                    {blogRecords}
                </div>
            </div>
            {this.state.isLoading ? (
            <div className="content-loader">
              <FontAwesomeIcon icon="spinner" spin />
            </div>) : null}
        </div>
    );
  }
}

export default BlogContainer;