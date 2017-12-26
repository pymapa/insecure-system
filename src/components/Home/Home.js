import React, { Component } from 'react'
import axios from 'axios'

import {EventList} from '../Events/EventList';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        }
    }

    componentDidMount() {
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
                <h1>Welcome to Easy Event Community!</h1>

                <p>Here's some upcoming events you might enjoy:</p>

                <EventList events={this.state.events} />
            </div>
        )
    }
}

export default Home