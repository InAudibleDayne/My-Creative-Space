import React, { Component } from 'react';
import Header from '../Header/header';

import AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';

export default class BlogDetail extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      blogItem: {},

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
    this.getBlogItem();
  }

  getBlogItem() {
    //TODO write get function for backend
    this.setState({
      blogItem: {id: 1, title: "Triumph - Tesla Taught Us How", description: "Laboris excepteur in id exercitation dolore. Adipisicing veniam sint ipsum aliquip et fugiat anim anim mollit. Quis exercitation proident do laborum dolore id aliquip tempor eu cillum est. Non ullamco officia ex excepteur aliqua dolor non. Eiusmod et adipisicing ex cillum ea consectetur aliqua. Deserunt ut reprehenderit dolore veniam et laboris elit laborum ullamco officia est Lorem. Est qui quis irure nisi excepteur in dolor Lorem veniam eu sunt. Laboris excepteur in id exercitation dolore. Adipisicing veniam sint ipsum aliquip et fugiat anim anim mollit. Quis exercitation proident do laborum dolore id aliquip tempor eu cillum est. Non ullamco officia ex excepteur aliqua dolor non. Eiusmod et adipisicing ex cillum ea consectetur aliqua. Deserunt ut reprehenderit dolore veniam et laboris elit laborum ullamco officia est Lorem. Est qui quis irure nisi excepteur in dolor Lorem veniam eu sunt.", blog_category: "books", file_location: "../../../assets/test_items/excerpts.pdf", upload_date: "2/1/2020"} 
    })
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

  tagCreator() {
    if (this.state.blogItem.blog_category === "music") {
        return <AudioPlayer
            src={`${this.state.blogItem.file_location}`}
            onPlay={e => console.log("onPlay")}
            showVolumeControl={true}
            />
    } else if (this.state.blogItem.blog_category === "videos") {
        return <ReactPlayer 
            url={`${this.state.blogItem.file_location}`}
            playing={false}
            controls={true}
            />
    } else if (this.state.blogItem.blog_category === "art") {
        return <img src={this.state.blogItem.file_location}/> 
    } else if (this.state.blogItem.blog_category === "books" ) {
        const { pageNumber, numPages } = this.state;

        return (
        <div className='blog-detail-pdf-wrapper'>
          <Document
          file={this.state.blogItem.file_location}
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
      upload_date
    } = this.state.blogItem;

    return (
        <div className="blog-detail">
          <Header currentPage='BLOG_DETAIL' loggedInStatus={this.props.loggedInStatus} handleLogout={this.handleLogout}/>
          <div className="blog-detail__container">
            <div className='blog-detail__title'>
              {title}
            </div>
            <div className='blog-detail__date'>
              {upload_date}
            </div>
            <div className='blog-detail__media'>
              {this.tagCreator()}
            </div>
            <div className='blog-detail__description'>
              {description}
            </div>
          </div>
        </div>
    );
  }
}