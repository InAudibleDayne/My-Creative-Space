import React, { Component } from 'react';
import Header from '../Header/header';

import { Document, Page } from 'react-pdf';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player';


export default class BlogDetail extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      blogItem: {},
      currentId: this.props.match.params.slug,

      numPages: null,
      pageNumber: 1
    }

    this.getBlogItem = this.getBlogItem.bind(this);
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.changePage = this.changePage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    console.log(this.state.currentId)
    this.getBlogItem();
  }

  getBlogItem() {
    //TODO write get function for backend
    axios.get(`http://localhost:5000/blog/${this.state.currentId}`
    ).then(response => {
        console.log(response.data)
        this.setState({
            blogItem: response.data
        })
    }).catch(error=> {
        console.log("getBlogItem error", error);
    });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  changePage = offset => {this.setState(prevState => ({
      pageNumber: prevState.pageNumber + offset,
    }));
  }

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  tagCreator(file_location, file_blob, blog_type) {
    if (blog_type === "MUSIC") {
        return <AudioPlayer
            className='detail-music'
            src={`${file_location ? file_location : file_blob}`}
            onPlay={e => console.log("onPlay")}
            showVolumeControl={true}
            />
    } else if (blog_type === "VIDEO") {
        return <ReactPlayer 
            url={`${file_location}`}
            playing={false}
            controls={true}
            />
    } else if (blog_type === "ART") {
        return <img className='detail-art'src={file_location ? file_location : file_blob}/> 
    } else if (blog_type === "BOOK" ) {
        const { pageNumber, numPages } = this.state;

        return (
        <div className='blog-detail-pdf-wrapper'>
          <Document
          file={file_location ? file_location : file_blob}
          onLoadSuccess={this.onDocumentLoadSuccess}
          className="blog-detail-pdf"
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div className="pdf-buttons-blog">
            <p>
                Page {this.state.pageNumber || (this.state.numPages ? 1 : '--')} of {this.state.numPages || '--'}
            </p>
            <button
                type="button"
                disabled={this.state.pageNumber <= 1}
                onClick={this.previousPage}
            >
                Previous
            </button>
            <button
                type="button"
                disabled={this.state.pageNumber >= this.state.numPages}
                onClick={this.nextPage}
            >
                Next
            </button>
          </div> 
        </div>
      )
    }
  }

  handleLogout () {
    this.props.handleSuccessfulLogout();
  }

  render() {
    const {
      title,
      description,
      blog_type,
      created_by_id,
      file_blob,
      file_location
    } = this.state.blogItem;

    return (
        <div className="blog-detail">
          <Header currentPage='BLOG_DETAIL' loggedInStatus={this.props.loggedInStatus} handleLogout={this.handleLogout} firstName={this.props.firstName}/>
          <div className="blog-detail__container">
            <div className='blog-detail__title'>
              {title}
            </div>
            <div className='blog-detail__media'>
              {this.tagCreator(file_location, file_blob, blog_type)}
            </div>
            <div className='blog-detail__description'>
              {ReactHtmlParser(description)}
            </div>
          </div>
        </div>
    );
  }
}