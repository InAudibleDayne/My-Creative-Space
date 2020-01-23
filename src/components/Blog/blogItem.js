import React, {Component} from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";
import AudioPlayer from 'react-h5-audio-player';


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
        if (this.state.blog_category === "MUSIC") {
            return <AudioPlayer
                src={`${this.state.file_location}`}
                onPlay={e => console.log("onPlay")}
                showVolumeControl={true}
                />
        }
    }

    componentWillMount() {
        this.tagCreator();
    }

    render() {
        return (
            <div className='blog-item-wrapper'>
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
                    lines={3}
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