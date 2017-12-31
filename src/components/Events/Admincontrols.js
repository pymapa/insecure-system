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
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
         // Get event data
         axios.get("/api/events/" + this.props.eventId)
         .then(res => {
             this.setState({event: res.data.data});
         })
        axios.get('/api/attendees/' + this.props.eventId)
        .then(res => {
            console.log(res.data.data)
            this.setState({attendees: res.data.data});
        })
    }

    handleChange(e) {
        let _event = this.state.event;
        _event[e.target.name] = e.target.value;
        this.setState({event: _event});
    }

    save() {
        axios({
            method: 'post',
            url: '/api/admin/event/info',
            data: {
                info: this.state.event.info,
                eventId: this.props.eventId,
            },
            headers: {
                'x-access-token': sessionStorage.getItem('JWT')
            }
        })
        .then(res => {
            if(res.data.success) {
                window.location.reload();
            }
        })
    }

    delete() {
        if(window.confirm('Delete event. Are you sure?')) {
            axios.delete('/api/events/')
        }
        
    }

    render () {
        return (
            <div className="row">
                <div className="col">
                    <hr/>
                    <h4>ORGANIZER VIEW, NOT PUBLICLY VISIBLE</h4>

                    <div className="row">
                        <div className="col-6">
                            <Controls save={this.save} delete={this.delete} event={this.state.event} handleChange={this.handleChange} />
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