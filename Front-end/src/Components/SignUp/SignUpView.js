import React from 'react';

const signUpView = (props) => {

    return (
        <div id="sign-up-view-main">
            <h1 className="sign-up-app-name">MY TASKS</h1>
            <div className="my-container">
                <h1 className="title">Sign up</h1>
                <div className="input-form">
                    <form>

                        <div className="form-group">
                            <p id="errors">{props.errors}</p>
                            <label htmlFor="first-name">First name</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-user"/></div>
                                <input id="first-name" className="form-control input-lg" type="text" onChange={props.onFirstNameChangeHandler} placeholder="First name" maxLength="30"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="last-name">Last name</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-user"/></div>
                                <input id="last-name" className="form-control input-lg" type="text" onChange={props.onLastNameChangeHandler} placeholder="Last name" maxLength="30"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-envelope"/></div>
                                <input id="email" className="form-control input-lg" type="email" onChange={props.onEmailChangeHandler} placeholder="Email" maxLength="254"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <div className="input-group-addon"><i className="fa fa-lock"/></div>
                                <input id="password" className="form-control input-lg" type="password" onChange={props.onPasswordChangeHandler} placeholder="Password" maxLength="30"/>
                            </div>
                        </div>

                        <button id="submit-log-in" className="btn btn-success btn-lg" onClick={props.onSignUpClickHandler}>Sign up</button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default signUpView;