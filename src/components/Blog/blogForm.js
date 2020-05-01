import React, { Component } from 'react';
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

import RichTextEditor from "./rich-text-editor";

export default class BlogForm extends Component {
    constructor(props) {
        super(props);

        //
        this.state = {
            id: "",
            title: "",
            blog_type: "MUSIC",
            content: "",
            featured_image: "",
            file_location: "",
            apiUrl: "https://my-creative-space-backend.herokuapp.com/blog",
            apiAction: "post"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.imageUploader = this.imageUploader.bind(this);
        this.buildForm = this.buildForm.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.featuredText = this.featuredText.bind(this);

        this.featuredImageRef = React.createRef();
    }

    componentWillMount() {
        if (this.props.editMode) {
            this.setState({ 
                //TODO Destructure refactor
                id: this.props.blog.id,
                title: this.props.blog.title,
                blog_status: this.props.blog.blog_status,
                content: this.props.blog.content,
                apiUrl: `https://my-creative-space-backend.herokuapp.com/blog/${this.props.blog.id}`,
                apiAction: "patch"
            })
        }
    }

    componentConfig() {
        return {
            iconFiletypes: [".png"],
            showFiletypeIcon: false,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    handleFeaturedImageDrop() {
        return {
            addedfile: file => {
                this.getBase64(file);
            }
        }
    }

    getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => this.setState({
            featured_image: reader.result
        });
        reader.onerror = error => {};
    }

    handleRichTextEditorChange(content) {
        this.setState({content});
    }

    buildForm() {
        // let formData = new FormData();

        // formData.append("title", this.state.title);
        // formData.append("description", this.state.content);
        // formData.append("blog_type", this.state.blog_type);

        // if(this.state.file_location) {
        //     formData.append("file_location", this.state.file_location);
        // } else {
        //     formData.append("file_location", "null")
        // }
        // if (this.state.featured_image) {
        //     formData.append("file_blob", this.state.featured_image);
        // } else {
        //     formData.append("file_blob", "null")
        // }

        // formData.append("created_by_id", this.props.userId);

        // return formData;

        let myJSONRequest = {
            "title": this.state.title,
            "description": this.state.content,
            "blog_type": this.state.blog_type,
            "file_location": this.state.file_location,
            "file_blob": this.state.featured_image,
            "created_by": this.props.userId
        }

        return myJSONRequest;
    }

    deleteImage(imageType) {
        axios
            .delete(
                `https://my-creative-space-backend.herokuapp.com/blog/${this.props.blog.id}?image_type=${imageType}`
            )
            .then(response => {
                this.props.handleFeaturedImageDelete();
            })
            .catch(error => {
                console.log("deleteImage error", error);
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm()
          })
          .then(response => {
                if (this.state.featured_image) {
                    this.featuredImageRef.current.dropzone.removeAllFiles();
                };

                this.setState({
                    id: "",
                    title: "",
                    blog_type: "",
                    content: "",
                    featured_image: "",
                    file_location: "",
                });

                if (this.props.editMode) {
                    this.props.handleUpdateFormSubmission(response.data);
                } else {
                    this.props.handleSuccessfulFormSubmission(response.data);
                }
            }).catch(error => {
                console.log("handleSubmit for blog error", error);
            });
        event.preventDefault();
    }

    imageUploader() {
        if(this.state.blog_type !== "VIDEO" ) {
            return <div className="image-uploaders">
                {this.props.editMode && this.props.blog.featured_image_url ? (            <div className="portfolio-manager-image-wrapper">
                <img src={this.props.blog.featured_image_url}/>

                <div className="image-removal-link">
                    <a onClick={() => this.deleteImage("featured_image")}>
                    Remove Image
                    </a>
                </div>
                </div> ) : ( 
                <DropzoneComponent 
                ref={this.featuredImageRef}
                config={this.componentConfig()}
                djsConfig={this.djsConfig()}
                eventHandlers={this.handleFeaturedImageDrop()}
                >
                    <div className="dz-message">{this.featuredText()}</div>
                </DropzoneComponent>
                )}
                <div className='or'>OR</div>
            </div>
        } else {
            return null
        }
    }

    featuredText() {
        if(this.state.blog_type === "ART") {
            return "Your Image.jpg or .png"
        } else if(this.state.blog_type === "MUSIC") {
            return "Your Song.mp3"
        } else if(this.state.blog_type === "BOOK") {
            return "Your Book.pdf"
        }
      };

  render() {
    return (
        <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className="two-column">
            <input 
            onChange={this.handleChange} 
            type="text"
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
            />
          <select className="select-element"
            name="blog_type"
            value={this.state.blog_type}
            onChange={this.handleChange}
          >
            <option value="MUSIC">Music</option>
            <option value="VIDEO">Video</option>
            <option value="BOOK">Book</option>
            <option value="ART">Art</option>
          </select>
        </div>

        <div className="one-column">
            <RichTextEditor 
            editMode={this.props.editMode}
            contentToEdit={ this.props.editMode && this.props.blog.content ? this.props.blog.content : null }
            handleRichTextEditorChange={this.handleRichTextEditorChange}
            />
        </div>
        
        {this.imageUploader()}

        <div className='two-column'>
            <input 
            onChange={this.handleChange}
            type='text'
            name='file_location'
            placeholder='Enter web location'
            value={this.state.file_location}
            />
        </div>

        <button className="btn">Save</button>
        </form>
    );
  }
}