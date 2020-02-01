import React, { Component } from 'react';
import Header from '../Header/header';

export default class BlogDetail extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      blogItem: {}
    }

    this.getBlogItem = this.getBlogItem.bind(this);
  }

  componentWillMount() {
    this.getBlogItem();
  }

  getBlogItem() {
    //TODO write get function for backend
    this.setState({
      blogItem: {id: 1, title: "Triumph - Tesla Taught Us How", description: "This is a test of the Audio player", blog_category: "music", file_location: "../../../assets/test_items/Triumph.mp3"} 
    })
  }


  render() {
    return (
        <div>
            <Header currentPage='BLOG_DETAIL' />
        </div>
    );
  }
}