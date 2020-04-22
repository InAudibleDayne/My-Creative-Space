import React, { Component } from 'react';
import Header from '../Header/header';
import BlogItem from './blogItem';



export default class BlogContainer extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      blogItems: [
        {id: 1, title: "Triumph - Tesla Taught Us How", description: "This is a test of the Audio player", blog_type: "MUSIC", file_location: "../../../assets/test_items/Triumph.mp3"}, 
        {id: 2, title: "Memories We Leave Behind - Tesla Taught Us How", description: "Laboris excepteur in id exercitation dolore. Adipisicing veniam sint ipsum aliquip et fugiat anim anim mollit. Quis exercitation proident do laborum dolore id aliquip tempor eu cillum est. Non ullamco officia ex excepteur aliqua dolor non. Eiusmod et adipisicing ex cillum ea consectetur aliqua. Deserunt ut reprehenderit dolore veniam et laboris elit laborum ullamco officia est Lorem. Est qui quis irure nisi excepteur in dolor Lorem veniam eu sunt.", blog_type: "MUSIC", file_location: "../../../assets/test_items/memories-we-leave-behind.mp3"},
        {id: 3, title: "Video Test", description: "This is a test of the Audio Player", blog_type: "VIDEO", file_location: "https://www.youtube.com/watch?v=NXty07zLdrg"},
        {id: 4, title: "Image Test", description: "This is a test of the Image display", blog_type: "ART", file_location: "../../../assets/test_items/unchain_your_bleeding_heart.jpg"},
        {id: 5, title: "PDF Test", description: "This is a test of a book blog", blog_type: "BOOK", file_location:"../../../assets/test_items/dummy.pdf"},
        {id: 6, title: "PDF Test", description: "This is a test of a book blog", blog_type: "BOOK", file_location:"../../../assets/test_items/excerpts.pdf"}
      ],
      search: ''
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getBlogItems = this.getBlogItems.bind(this);
  }

  getBlogItems() {
    //TO DO write query to pull blog items
  }

  filterResults = (activeFilter) => {
    //TO DO write query to pull blogs with filter
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
            <Header currentPage='HOME' filters={this.filterResults} loggedInStatus={this.props.loggedInStatus} handleLogout={this.handleLogout} firstName={this.props.firstName} userId={this.props.userId} />
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

