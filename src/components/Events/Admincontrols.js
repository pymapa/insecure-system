import React, { Component } from 'react'
import axios from 'axios';

import {AttendeesList} from './AttendeesList';
import {Controls} from './Controls';

class Admincontrols extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: {},
            attendees: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/api/attendees/' + this.props.eventId)
        .then(res => {
            this.setState({attendees: res.data.data});
        })
    }

    handleChange(e) {
        let _event = this.state.event;
        _event[e.target.name] = e.target.value;
        this.setState({event: _event});
    }

    render () {
        return (
            <div className="row">
                <div className="col">
                    <hr/>
                    <h4>ORGANIZER CONTROLS, NOT PUBLICLY VISIBLE</h4>

                    <div className="row">
                        <div className="col-6">
                            <Controls event={this.state.event} handleChange={this.handleChange} />
                        </div>
                        <div className="col">
                            <AttendeesList attendees={this.state.attendees} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admincontrols