import React from 'react'

export const JoinForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label htmlFor="fname">First name</label>
                <input type="text" id="fname" name="fname" value={props.person.fname} onChange={props.handleChange} className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="lname">Last name</label>
                <input type="text" name="lname" id="lname" value={props.person.lname} onChange={props.handleChange} className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="number" name="age" min="1" max="110" id="age" value={props.person.age} onChange={props.handleChange} className="form-control"/>
            </div>
            <div className="form-group">
                <input type="submit" value="Attend" className="btn btn-primary"/>
            </div>
        </form>
    )
}