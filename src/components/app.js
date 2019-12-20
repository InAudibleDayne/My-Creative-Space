import React, { Component } from 'react';

import Header from './Header/header';
import Title from './Header/title';
import BlogContainer from './Blog/blogContainer';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Title />
        <Header />
        <BlogContainer />
      </div>
    );
  }
}
