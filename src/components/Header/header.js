import React, { Component } from 'react';

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: this.props.currentPage
        }

        this.homeLinks = this.homeLinks.bind(this);
        this.authLinks = this.authLinks.bind(this);
    }

    homeLinks() {
        return (
            <div className='header__links-wrapper'>
                <div className='header__links active'>
                    Music
                </div>
                <div className='header__links'>
                    Videos
                </div>
                <div className='header__links'>
                    Books
                </div>
                <div className='header__links'>
                    Art
                </div>
            </div>
        );
    }

    authLinks() {
        return(
            <div className='header__links-wrapper'>
                <div className='header__links'>
                    Home
                </div>
            </div>
        )
    }

  render() {
    return (
        <div className='header'>
        {this.state.currentPage === 'HOME' ? (this.homeLinks()) : null}
        {this.state.currentPage === 'AUTH' ? (this.authLinks()) : null}
        </div>
    );
  }
}