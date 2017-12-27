import React, { Component } from 'react'
import axios from 'axios'

import {EventInfo} from './EventInfo';
import {JoinForm} from './JoinForm';

class Event extends Component {
    constructor(props){
        super(props);

        this.state = {
            event: {}
        }
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
                <EventInfo event={this.state.event} />
            </div>
        )
    }
}

export default Event