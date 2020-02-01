import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: this.props.currentPage,
            active: 'all'
        }

        this.homeLinks = this.homeLinks.bind(this);
        this.authLinks = this.authLinks.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
                        <Link to='/login'>Login</Link>
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
                        <Link to='/login'>Login</Link>
                    </div>
                </div>
            </div>
        )
    }

  render() {
    return (
        <div className='header'>
        {this.state.currentPage === 'HOME' ? (this.homeLinks()) : null}
        {this.state.currentPage === 'AUTH' ? (this.authLinks()) : null}
        {this.state.currentPage === 'BLOG_DETAIL' ? (this.blogLinks()) : null}
        </div>
    );
  }
}