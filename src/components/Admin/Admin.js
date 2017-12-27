import React, { Component } from 'react';
import axios from 'axios'

import {EventList} from '../Events/EventList';
import { NewEvent } from './NewEvent';

class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            events: [],
            event: {
                name: "",
                date: ""
            },
            user: {}
        }
        this.handleEventChange = this.handleEventChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.put('/api/event', {
            name: this.state.event.name,
            date: this.state.event.date
        })
        .then(res => {
            if(res.data.success) {
                window.location.reload();
            }
        })
    }

    handleEventChange(e) {
        let _event = this.state.event;
        _event[e.target.name] = e.target.value;
        this.setState({event: _event});
    }

    componentDidMount() {
        this.setState({user: sessionStorage.getItem('JWT')});
        axios.get('/api/events')
        .then(res => {
            this.setState({events: res.data.data});
        })
        .catch(err => {
            console.log(err);
        })
        
    }
    render () {
        return (
            <div className="container">
                <h1>Admin</h1>
                <div className="row">
                    <div className="col-6">
                        <h4>Create new event</h4>
                        <NewEvent event={this.state.event} handleChange={this.handleEventChange} handleSubmit={this.handleSubmit} />
                    </div>
                    <div className="col-6">
                        <h4>Events</h4>
                        <EventList events={this.state.events} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h3>Users</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin