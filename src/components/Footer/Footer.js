import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class Footer extends Component {
    render () {
        return (
            <div className="container-fluid footer">
                <div className="row">
                    <div className="col" id="footer-flex">
                        <Link className="pull-right" to="/login">Admin login</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer