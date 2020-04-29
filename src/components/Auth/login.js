import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
          errorText: "",
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.successResponseGoogle = this.successResponseGoogle.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
        this.componentClicked = this.componentClicked.bind(this);
        this.facebookFailed = this.facebookFailed.bind(this);
      }
    
      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
          errorText: ""
        });
      }

      successResponseGoogle = (response) => {
        var userName = response.profileObj.email;
        var firstName = response.profileObj.givenName;
        axios({method: 'post',
              url: 'http://localhost:5000/user',
              data: {username: `${userName}`, name: `${firstName}`}})
              .then(response => {
                var userId = response.data.id;
                var loginName = response.data.name;
                this.props.handleSuccessfulAuth(loginName, userId);
              })
              .catch(error => {
                console.log("Login Error", error);
              });
      }

      responseGoogle = (response) => {
        console.log(response);
      }

      facebookFailed(response) {
        console.log(response);
      }

      handleSubmit(event) {
        //TODO add call to databases to confirm login
          console.log('Form Submitted', event);
          event.preventDefault();
          this.setState({
              email: "",
              password: ""
          });
          this.props.handleSuccessfulAuth();
      }

      componentClicked(){
        console.log("clicked")
      }

      responseFacebook = (response) => {
        var userName = response.id;
        var firstName = response.name;
        axios({method: 'post',
              url: 'http://localhost:5000/user',
              data: {username: `${userName}`, name: `${firstName}`}})
              .then(response => {
                var userId = response.data.id;
                var loginName = response.data.name;
                this.props.handleSuccessfulAuth(loginName, userId);
              })
              .catch(error => {
                console.log("Login Error", error);
              });
      }

  render() {
    return (
        <div>
            <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
    
              <div className="google-login">
                <h2>
                  Login Through Google
                </h2>
                <GoogleLogin
                  className="google-login__btn"
                  clientId="239390937938-vqum64b7vba20bvof5qjsm5a6e24ve4v.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={this.successResponseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
              <div className='separater'>
                <h2>
                  OR
                </h2>
              </div>
              <div className="facebook-login">
                <h2>
                  Login with Facebook
                </h2>
                <FacebookLogin
                  appId="253159762538046"
                  fields="name,email,picture"
                  onClick={this.componentClicked}
                  onFailure={this.facebookFailed}
                  callback={this.responseFacebook}
                  cssClass="facebook-login__btn"
                />
              </div>
        </div>
    );
  }
}