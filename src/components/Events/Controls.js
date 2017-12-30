import React from 'react'

export const Controls = (props) => {
    return (
        <div>
            <h5>controls</h5>
            <div className="form-group">
                <label htmlFor="info">Add or modify infotext for the event. You can use html -markup.</label>
                <textarea className="form-control" onChange={props.handleChange} value={props.event.info} name="info" id="info" cols="30" rows="10"></textarea>
            </div>
            <button className="btn btn-primary" onClick={props.save}>Save changes</button>
            {/* <button className="btn btn-danger" onClick={props.delete}>Delete event</button> */}
        </div>
    )
}