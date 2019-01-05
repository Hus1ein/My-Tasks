import React from 'react';

const loginView = (props) => {

    return (
        <div id="login-view-main">
            <h1 className="app-name">MY TASKS</h1>
            <div className="my-container">

                <h1>Log in</h1>
                <h4>or <a>create an account</a></h4>
                <div className="input-form">
                    <form>

                        <div className="form-group">
                            <p id="errors">{props.errors}</p>
                            <label htmlFor="username">Email address</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-envelope"/></div>
                                <input id="username" className="form-control input-lg" type="email" onChange={props.onUsernameChangeHandler} placeholder="Email" maxLength="254"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-lock"/></div>
                                <input id="password" className="form-control input-lg" type="password" onChange={props.onPasswordChangeHandler} placeholder="Password" maxLength="30"/>
                            </div>
                        </div>

                        <button id="submit-log-in" className="btn btn-success btn-lg" onClick={props.onLoginclickHandler}>Log in</button>

                    </form>
                </div>

                <a><h3>Forgot your password? </h3></a>

            </div>
        </div>
    );
};

export default loginView;