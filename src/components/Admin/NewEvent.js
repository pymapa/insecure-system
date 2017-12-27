import React from 'react'

export const NewEvent = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" value={props.event.name} onChange={props.handleChange} name="name" id="name" className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="datetime-local" value={props.event.date} onChange={props.handleChange} name="date" id="date" className="form-control" required/>
            </div>
            <div className="form-group">
                <input type="submit" value="Create"/>
            </div>
        </form>
    )
}