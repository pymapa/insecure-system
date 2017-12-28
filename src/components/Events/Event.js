import React, { Component } from 'react'
import axios from 'axios'

import {EventInfo} from './EventInfo';
import {JoinForm} from './JoinForm';
import Admincontrols from './Admincontrols';

class Event extends Component {
    constructor(props){
        super(props);

        this.state = {
            event: {},
            person: {
                fname: "",
                lnaem: "",
                age: "0"
            },
            isOrganizer: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // Check user privileges
        if(sessionStorage.getItem('JWT')) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if(user.role > 2) {
                this.setState({isOrganizer: true})
            }
        }
        // Get event data
        axios.get("/api/events/" + this.props.match.params.id)
        .then(res => {
            this.setState({event: res.data.data});
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        axios.put('/api/attend', {
            fname: this.state.person.fname,
            lname: this.state.person.lname,
            age: this.state.person.age,
            eventId: this.state.event.id
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleChange(e) {
        let _person = this.state.person;
        _person[e.target.name] = e.target.value;
        this.setState({person: _person});
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <EventInfo event={this.state.event} />
                        <hr/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <h4>Join event</h4>
                        <JoinForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} person={this.state.person} />
                    </div>
                </div>
                
                {this.state.isOrganizer ? <Admincontrols eventId={this.props.match.params.id} event={this.state.event} /> : ""}
                
            </div>
        )
    }
}

export default Event