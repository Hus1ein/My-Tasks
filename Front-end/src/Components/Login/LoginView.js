import React from 'react';
import adidas from "./adidas.jpg";

const loginView = (props) => {

    return (
        <div id="login-view-main">
            <h1 className="app-name">MY TASKS</h1>
            <div className="my-container-log-in">

                <h1>Log in</h1>
                <h4>or <a href="/signup">create an account</a></h4>
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

            <div className="ads">
                <a href="https://www.adidas.com/" target="_blank"><img className="login-ads" src={adidas} height="250px" width="60%"/></a>
            </div>
        </div>
    );

};

export default loginView;
