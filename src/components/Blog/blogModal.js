import React, { Component } from 'react';
import ReactModal from "react-modal";
import BlogForm from "./blogForm";

ReactModal.setAppElement(".app-wrapper");

export default class BlogModal extends Component {
    constructor(props) {
        super(props);

        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%",
                width: "80vw",
                background: "rgb(13, 0, 25, 0.75)",
                border: "1px solid rgb(212, 1, 141)"
            },
            overlay: {
                backgroundColor: "rgb(13, 0, 25, 0.75)"
            }
        }

        this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    }

    handleSuccessfulFormSubmission(blog) {
        this.props.handleSuccessfulNewBlogSubmission(blog);
    }

  render() {
    return (
        <div>
            <ReactModal 
            style={this.customStyles}
            onRequestClose={() => { 
                this.props.handleModalClose(); 
            }} 
            isOpen={this.props.modalIsOpen}>
                <BlogForm 
                userId={this.props.userId}
                handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                />
            </ReactModal>
        </div>
    );
  }
}