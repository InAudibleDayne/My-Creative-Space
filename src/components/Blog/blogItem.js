import React, {Component} from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";
import Truncate from "react-truncate";
import AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player';
import { Document, Page } from 'react-pdf';

export default class BlogItem extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            id: this.props.blogItem.id,
            blog_type: this.props.blogItem.blog_type,
            description: this.props.blogItem.description,
            title: this.props.blogItem.title,
            file_location: this.props.blogItem.file_blob,

            numPages: null,
            pageNumber: 1
        }
        
        this.tagCreator = this.tagCreator.bind(this);
        this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
        this.changePage = this.changePage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        };

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
        if (this.state.blog_type === "MUSIC") {
            return <AudioPlayer
                src={`${this.state.file_location}`}
                onPlay={e => console.log("onPlay")}
                showVolumeControl={true}
                />
        } else if (this.state.blog_type === "VIDEO") {
            return <ReactPlayer 
                url={`${this.state.file_location}`}
                playing={false}
                controls={true}
                />
        } else if (this.state.blog_type === "ART") {
            return <img src={this.state.file_location}/> 
        } else if (this.state.blog_type === "BOOK" ) {
            const { pageNumber, numPages } = this.state;

            return (
            <React.Fragment>
                <Document
                file={this.state.file_location}
                onLoadSuccess={this.onDocumentLoadSuccess}
                className="pdf"
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <div className="pdf-buttons">
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
            </React.Fragment>
            )
        }
    }

    componentWillMount() {
        this.tagCreator();
    }

    render() {
        return (
            <div className={`blog-item-wrapper ${this.state.blog_type}`}>
                <div className='left-side'>
                    <Link to={`/b/${this.state.id}`}>
                        <h1>{this.state.title}</h1>
                    </Link>
                    <div>
                    {this.tagCreator()}
                    </div>
                </div>
                <div className='right-side'>
                    <Truncate 
                    lines={5}
                    ellipsis={
                        <span>
                        ... <Link to={`/b/${this.state.id}`}>Read More</Link>
                        </span>
                    }>
                        {striptags(this.state.description)}
                    </Truncate>
                </div>
            </div>
        );
    }
}