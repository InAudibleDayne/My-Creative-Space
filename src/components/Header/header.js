import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: 'all'
        }

        this.homeLinks = this.homeLinks.bind(this);
        this.authLinks = this.authLinks.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.loginLogoutDecider = this.loginLogoutDecider.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleClick(event) {
        var element = event.target;
        if (element.id !== this.state.active) {
            this.setState({
                active: element.id
            });
            this.props.filters(element.id);
        }
    }

    handleSignOut() {
        this.props.handleLogout();
    }

    loginLogoutDecider() {
        if (this.props.loggedInStatus === 'NOT_LOGGED_IN') {
            return <Link to='/login'>Login</Link>
        } else {
            return <div>
                <Link className="logout" to='/user-account'>{this.props.firstName}</Link>
                <a onClick={this.handleSignOut}>Logout</a>
                </div>
        }
    }

    homeLinks() {
        return (
            <div className='header__bar-wrapper'>
                <div className='header__links-wrapper'>
                    <div id='all' className={`header__links ${this.state.active === 'all' ? 'active' : null}`} onClick={() => this.handleClick(event)}>
                        All
                    </div>
                    <div id='music' className={`header__links ${this.state.active === 'music' ? 'active' : null}`} onClick={() => this.handleClick(event)}>
                        Music
                    </div>
                    <div id='videos' className={`header__links ${this.state.active === 'videos' ? 'active' : null}`} onClick={() => this.handleClick(event)}>
                        Videos
                    </div>
                    <div id='books' className={`header__links ${this.state.active === 'books' ? 'active' : null}`} onClick={() => this.handleClick(event)}>
                        Books
                    </div>
                    <div id='art' className={`header__links ${this.state.active === 'art' ? 'active' : null}`} onClick={() => this.handleClick(event)}>
                        Art
                    </div>
                </div>
                <div className='header__login-wrapper'>
                    <div className='header__login'>
                        {this.loginLogoutDecider()}
                    </div>
                </div>
            </div>
        );
    }

    authLinks() {
        return(
            <div className='header__links-wrapper'>
                <div className='header__links'>
                    <Link to='/'>Home</Link>
                </div>
            </div>
        )
    }

    blogLinks() {
        return(
            <div className='header__bar-wrapper'>
                <div className='header__links-wrapper'>
                    <div className='header__links'>
                        <Link to='/'>Home</Link>
                    </div>
                </div>
                <div className='header__login-wrapper'>
                    <div className='header__login'>
                        {this.loginLogoutDecider()}
                    </div>
                </div>
            </div>
        )
    }

    accountLinks() {
        <div className='header__links-wrapper'>
            <div className='header__links'>
                <Link to='/'>Home</Link>
            </div>
        </div>
    }

  render() {
    return (
        <div className='header'>
        {this.props.currentPage === 'HOME' ? (this.homeLinks()) : null}
        {this.props.currentPage === 'AUTH' ? (this.authLinks()) : null}
        {this.props.currentPage === 'NO_MATCH' ? (this.authLinks()) : null}
        {this.props.currentPage === 'BLOG_DETAIL' ? (this.blogLinks()) : null}
        {this.props.currentPage === 'ACCOUNT_PAGE' ? (this.accountLinks()) : null}
        </div>
    );
  }
}