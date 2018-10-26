import React, { Component } from 'react';
import "../../Styles/home.css";
import Login from './../Login/Login';
import SignUp from './../SignUp/SignUp';

const homeView = (props) => {

    return (

        <div>
            <nav className="navbar navbar-default navbar-fixed-top">

                <div className="home-container">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand navbar-logo" href="#">My Tasks</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#" onClick={() => props.changeView(<Login/>)}>Log In</a></li>
                                <li>
                                    <button className="btn btn-default" onClick={() => props.changeView(<SignUp/>)}>Sign Up</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </nav>

            <div className="first-section">
                <div className="home-container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="first-section-first-title">Organize life</h1>
                            <h1 className="first-section-second-title">Then go enjoy it…</h1>
                            <p className="first-section-paragraph"><span className="my-tasks">My Tasks</span> brings
                                a shared perspective to any of life’s projects in a fun, flexible, and rewarding
                                way.</p>
                        </div>
                        <div className="col-md-6"><img id="first-section-image"
                                                       src="https://d3ptyyxy2at9ui.cloudfront.net/a11f874bc2b20e7cb0edb2e19fc4ddb1.png"
                                                       width="623"/></div>
                    </div>
                </div>
            </div>
            <div className="second-section">
                <div className="home-container">
                    <div className="row">
                        <div className="col-md-6"><img id="second-section-image"
                                                       src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/356f5c95fce4c40c67d16d526be2af1c/hero-a.svg"/>
                        </div>
                        <div className="col-md-6">
                            <h1 className="second-section-first-title">Stay organized, wherever you are</h1>
                            <p className="second-section-paragraph">Plan, keep records, and manage projects from any
                                device–even offline.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default homeView;