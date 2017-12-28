import React from 'react'

export const Controls = (props) => {
    return (
        <div>
            <h5>controls</h5>
            <div className="form-group">
                <label htmlFor="infotext">Add or modify infotext for the event</label>
                <textarea className="form-control" onChange={props.handleChange} value={props.event.info} name="infotext" id="infotext" cols="30" rows="10"></textarea>
            </div>
            
        </div>
    )
}