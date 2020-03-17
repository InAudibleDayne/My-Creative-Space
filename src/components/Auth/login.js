import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        this.responseGoogle = this.responseGoogle.bind(this);
      }
    
      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
          errorText: ""
        });
      }

      responseGoogle = (response) => {
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
  render() {
    return (
        <div>
            <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
    
            <div>{this.state.errorText}</div>
    
            <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
              <div className="form-group">
              <FontAwesomeIcon icon="envelope" />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              </div>
  
              <div className="form-group">
              <FontAwesomeIcon icon="lock" />
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              </div>
  
              <button className="btn" type="submit">
                Login
              </button>

              <GoogleLogin
                clientId="239390937938-vqum64b7vba20bvof5qjsm5a6e24ve4v.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />,
            </form>
        </div>
    );
  }
}