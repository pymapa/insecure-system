import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn: false
        }
    }
    componentDidMount() {
        if(sessionStorage.getItem('JWT')) {
            this.setState({loggedIn: true});
        }
    }

    logout() {
        sessionStorage.clear();
        window.location.replace('/');
    }

    render () {
        return (
            <div className="container-fluid footer">
                <div className="row">
                    <div className="col" id="footer-flex">
                        {this.state.loggedIn ? (
                            <a href="" onClick={this.logout}>Log out</a>
                        ) : (
                            <Link className="pull-right" to="/login">Admin login</Link>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer