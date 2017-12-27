import React, { Component } from 'react'
import axios from 'axios'

import {LoginForm} from './LoginForm';

const STATE_INPUT = 1;
const STATE_SENT = 2;
const STATE_READY = 3;

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signInState: STATE_INPUT,
            user: {
                username: "",
                password: ""
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({signInState: STATE_SENT});
        axios.post('/api/login', {
            username: this.state.user.username,
            password: this.state.user.password
        })
        .then(res => {
            console.log(res);
            sessionStorage.setItem('JWT', res.data.token);
            sessionStorage.setItem('user', JSON.stringify(res.data.user));
            window.location.replace("/admin");
        })
        .catch(err => {
            console.log(err);
            this.setState({signInState: STATE_INPUT});
        })
    }

    handleChange(e) {
        let _user = this.state.user;
        _user[e.target.name] = e.target.value
        this.setState({user: _user});
    }

    componentDidMount() {
        if(sessionStorage.getItem('JWT')) {
            window.location.replace('/admin');
        }
    }

    render () {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        {this.state.signInState === STATE_INPUT ? <LoginForm user={this.state.user} handleChange={this.handleChange} state={this.state.signInState} handleSubmit={this.handleSubmit} /> : <p>Signing in...</p> }  
                    </div>
                </div>
            </div>
        )
    }
}

export default Login