import React from 'react';

export const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} name="login">
            <h3>Log in to admin panel</h3>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={props.user.username} onChange={props.handleChange} required placeholder="Username" className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={props.user.password} onChange={props.handleChange} required placeholder="Password" className="form-control"/>
            </div>
            <div className="form-group">
                <input type="submit" value="Login" className="btn btn-primary"/>
            </div>
        </form>
    )
}