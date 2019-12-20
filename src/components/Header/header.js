import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
        <div className='header'>
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
        </div>
    );
  }
}