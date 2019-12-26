import React, { Component } from 'react';
import Header from '../Header/header';

export default class BlogContainer extends Component {
  render() {
    return (
        <div>
            <Header currentPage='HOME'/>
            <div className='content'>
                <div className='blog-container'>
                    Blog Goes here
                </div>
            </div>
        </div>
    );
  }
}