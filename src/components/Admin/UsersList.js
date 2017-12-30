import React from 'react'

export const UsersList = (props) => {
    let rows = props.users.map((u, i) => {
        return (
            <tr key={i}>
                <td>{u.name}</td>
                <td>{u.role}</td>
            </tr>
        )
    })
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}