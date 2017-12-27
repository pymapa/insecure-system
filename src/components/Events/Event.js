import React, { Component } from 'react'
import axios from 'axios'

import {EventInfo} from './EventInfo';
import {JoinForm} from './JoinForm';

class Event extends Component {
    constructor(props){
        super(props);

        this.state = {
            event: {},
            person: {
                fname: "",
                lnaem: "",
                age: "0"
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    componentDidMount() {
        axios.get("/api/events/" + this.props.match.params.id)
        .then(res => {
            console.log(res.data.data);
            this.setState({event: res.data.data});
        })
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
                
            </div>
        )
    }
}

export default Event