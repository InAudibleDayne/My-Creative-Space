import React, {Component} from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import AudioPlayer from 'react-h5-audio-player';
import ReactPlayer from 'react-player';


export default class BlogItem extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            id: this.props.blogItem.id,
            blog_category: this.props.blogItem.blog_category,
            description: this.props.blogItem.description,
            title: this.props.blogItem.title,
            file_location: this.props.blogItem.file_location
        }
        
        this.tagCreator = this.tagCreator.bind(this);
    };

    tagCreator() {
        if (this.state.blog_category === "music") {
            return <AudioPlayer
                src={`${this.state.file_location}`}
                onPlay={e => console.log("onPlay")}
                showVolumeControl={true}
                />
        } else if (this.state.blog_category === "videos") {
            return <ReactPlayer 
                url={`${this.state.file_location}`}
                playing={false}
                controls={true}
                />
        } else if (this.state.blog_category === "art") {
            return <img src={this.state.file_location}/> 
        }
    }

    componentWillMount() {
        this.tagCreator();
    }

    render() {
        return (
            <div className={`blog-item-wrapper ${this.state.blog_category}`}>
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
                        {this.state.description}
                    </Truncate>
                </div>
            </div>
        );
    }
}