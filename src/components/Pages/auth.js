import React, { Component } from "react";
import Login from "../Auth/login";
import cameraImg from "../../../static/assets/images/camera.jpg";
import Header from "../Header/header";

export default class Auth extends Component {
  constructor(props) {
    super(props);


    this.state = {
      currentSlide: cameraImg
    };


    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(loginName, userId) {
    this.props.handleSuccessfulLogin(loginName, userId);
    this.props.history.push("/");
  }

  handleUnsuccessfulAuth() {
    this.props.handleUnsuccessfulLogin();
  }

  render() {
    return (
        <div>
            <Header currentPage='AUTH'/>
            <div className="auth-page-wrapper">
                <div
                className="slideshow-wrapper"
                style={{
                    backgroundImage: `url(${this.state.currentSlide})`
                }}
                />

                <div className="login">
                <Login
                    handleSuccessfulAuth={this.handleSuccessfulAuth}
                    handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
                />
                </div>
            </div>
      </div>
    );
  }
}