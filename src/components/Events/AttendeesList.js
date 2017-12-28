import React from 'react';

export const AttendeesList = (props) => {
    let list = props.attendees.map((a, i) => {
        return (
            <tr key={i}>
                <td>{a.fname} {a.lname}</td>
                <td>{a.age}</td>
            </tr>
        )
    })
    return (
        <div>
            <h5>attendees</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        </div>
    )
}