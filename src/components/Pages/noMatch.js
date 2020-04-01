import React, {Component} from 'react';
import { Link } from "react-router-dom"
import Header from '../Header/header';

export default class NoMatch extends Component {
    render() {
        return(
            <div>
                <Header currentPage='NO_MATCH'/>
                <div className='no-match'>
                    <h1>We couldn't find that page</h1>
                    <div className='link'>
                        <Link to="/">Return to homepage?</Link>
                    </div>
                </div>
            </div>
        );
    }
}