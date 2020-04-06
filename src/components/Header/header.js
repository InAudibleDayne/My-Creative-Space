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
        this.accountLinks = this.accountLinks.bind(this);
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
            return <Link className="left" to='/login'>Login</Link>
        } else {
            return <div className='logout'>
                <Link className="logout__account-link" to='/user-account'>Account</Link>
                <a className="logout__logout-link" onClick={this.handleSignOut}>Logout</a>
            </div>
        }
    }

    homeLinks() {
        return (
            <div className='header__bar-wrapper'>
                <div className='header__title-wrapper'>
                    {this.props.loggedInStatus === 'LOGGED_IN' ? (
                    <div className='header__name'>
                        Hey {this.props.firstName}!
                    </div>) : null}
                </div>
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
        return(
            <div className='header__bar-wrapper'>
                <div className='header__title-wrapper'>
                    <div className='header__name'>
                        {this.props.firstName}'s Account
                    </div>
                </div>
                <div className='header__links-wrapper'>
                    <div id='all' className={`header__links ${this.state.active === 'all' ? 'active' : null}`} onClick={() => this.handleClick(event)}>
                        All
                    </div>
                    <div id='music' className={`header__links ${this.state.active === 'music' ? 'active' : null}`} onClick={() => this.handleClick(event)}>
                        My Music
                    </div>
                    <div id='videos' className={`header__links ${this.state.active === 'videos' ? 'active' : null}`} onClick={() => this.handleClick(event)}>
                        My Videos
                    </div>
                    <div id='books' className={`header__links ${this.state.active === 'books' ? 'active' : null}`} onClick={() => this.handleClick(event)}>
                        My Books
                    </div>
                    <div id='art' className={`header__links ${this.state.active === 'art' ? 'active' : null}`} onClick={() => this.handleClick(event)}>
                        My Art
                    </div>
                </div>
                <div className='header__login-wrapper'>
                    <div className='header__links top'>
                        <Link to='/'>Home</Link>
                    </div>
                    <div className='header__login'>
                        <div className='logout'>
                            <a className="logout__logout-link" onClick={this.handleSignOut}>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

  render() {
    return (
        <div className='header'>
        {this.props.currentPage === 'HOME' ? (this.homeLinks()) : null}
        {this.props.currentPage === 'AUTH' ? (this.authLinks()) : null}
        {this.props.currentPage === 'NO_MATCH' ? (this.authLinks()) : null}
        {this.props.currentPage === 'BLOG_DETAIL' ? (this.blogLinks()) : null}
        {this.props.currentPage === 'ACCOUNT' ? (this.accountLinks()) : null}
        </div>
    );
  }
}