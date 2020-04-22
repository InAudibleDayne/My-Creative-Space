import React, { Component } from 'react';
import Header from '../Header/header';
import BlogItem from './blogItem';
import axios from 'axios';



export default class BlogContainer extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      blogItems: [],
      search: '',
      currentPage: 0,
      totalCount: 0
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getBlogItems = this.getBlogItems.bind(this);
  }

  componentWillMount() {
    this.getBlogItems();
  }

  getBlogItems() {
    var offset = (this.state.currentPage * 10)
    axios
        .get(`http://localhost:5000/blogs/${offset}`
        ).then(response => {
            console.log(response)
            this.setState({
                blogItems: this.state.blogItems.concat(response.data),
                totalCount: response.data.length,
                isLoading: false
            });
            console.log(response.data);
    }).catch(error => {
        console.log("getBlogItems error", error);
    });
  }

  filterResults = (activeFilter) => {
    if(activeFilter === 'all') {
      var offset = (this.state.currentPage * 10)
      axios
          .get(`http://localhost:5000/blogs/${offset}`
          ).then(response => {
              console.log(response)
              this.setState({
                  blogItems: response.data,
                  totalCount: response.data.length,
                  isLoading: false
              });
              console.log(response.data);
      }).catch(error => {
          console.log("getBlogItems error", error);
      });
    } else {
      var offset = (this.state.currentPage * 10)
      axios
          .get(`http://localhost:5000/blogs/sort/${activeFilter}/${offset}`
          ).then(response => {
              console.log(response)
              this.setState({
                  blogItems: response.data,
                  totalCount: response.data.length,
                  isLoading: false
              });
              console.log(response.data);
      }).catch(error => {
          console.log("getBlogItems error", error);
      });
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
            <div className="search-wrapper">
              <input 
                name="search"
                type='text'
                placeholder="Search"
                value={this.state.search}
                onChange={this.handleChange}
              />
            </div>
            <div className='content'>
                <div className='blog-container'>
                    {blogRecords}
                </div>
            </div>
        </div>
    );
  }
}

