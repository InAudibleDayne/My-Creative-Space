import React, { Component } from 'react';
import Header from '../Header/header';
import BlogItem from './blogItem';

export default class BlogContainer extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      blogItems: [{id: 1, title: "Triumph - Tesla Taught Us How", description: "This is a test of the Audio player", blog_category: "MUSIC", file_location: "../../../assets/test_items/Triumph.mp3"}, {id: 2, title: "Memories We Leave Behind - Tesla Taught Us How", description: "This is a test of the Audio player", blog_category: "MUSIC", file_location: "../../../assets/test_items/memories-we-leave-behind.mp3"}]
    }
  }
  
  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      console.log(blogItem)
      return <BlogItem key={blogItem.id} blogItem={blogItem} />
    })
    return (
        <div>
            <Header currentPage='HOME'/>
            <div className='content'>
                <div className='blog-container'>
                    {blogRecords}
                </div>
            </div>
        </div>
    );
  }
}