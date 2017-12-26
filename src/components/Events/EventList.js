import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

export const EventList = (props) => {
    let rows = props.events.map((e, i) => {
        return (
            <tr key={i}>
                <td>{e.name}</td>
                <td><Moment format="DD.MM.YYYY">{e.date}</Moment></td>
                <td><Link to={"/event/" + e.id}>See more</Link></td>
            </tr>
        )
    })
    return (
        <div>
            <table className="table">
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}