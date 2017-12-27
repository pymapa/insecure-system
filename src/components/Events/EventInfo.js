import React from 'react';
import Moment from 'react-moment';

export const EventInfo = (props) => {
    return (
        <div>
            <h1>{props.event.name}</h1>
            <h2><Moment format="DD.MM.YYYY">{props.event.time}</Moment></h2>
            <div dangerouslySetInnerHTML={{__html: props.event.info}}>
            </div>
        </div>
    )
}