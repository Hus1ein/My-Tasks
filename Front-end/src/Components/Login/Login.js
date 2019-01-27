import React, { Component } from 'react';
import "../../Styles/login.css";
import "../../Styles/loader.css";
import LoginView from './LoginView';
import app from "../../base";

class Login extends Component {

    state = {
        'username': undefined,
        'password': undefined,
        'errors': undefined
    };

    onLoginClickHandler = async (event) => {
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        if (username !== undefined && username !== "" && password !== undefined && password !== ""
            && username.indexOf(" ") === -1 && password.indexOf(" ") === -1){

            this.setState({'errors': undefined});
            let self = this;
            document.getElementById("login-view-main").hidden = true;
            document.getElementsByClassName("lds-roller")[0].hidden = false;
            try {
                const user = await app
                    .auth()
                    .signInWithEmailAndPassword(this.state.username, this.state.password);
                document.getElementById("login-view-main").hidden = false;
                document.getElementsByClassName("lds-roller")[0].hidden = true;
                this.props.history.push("/dashboard");
            } catch (error) {
                document.getElementById("login-view-main").hidden = false;
                document.getElementsByClassName("lds-roller")[0].hidden = true;
                this.setState({'errors': "Error: Try again."});
            }

        }else {
            this.setState({'errors': "Enter valid username and password, don't use white space."});
        }

    };

    onUsernameChangeHandler = (event) => {
        let username = event.target.value;
        this.setState ({
            'username': username.trim()
        });
    };

    onPasswordChangeHandler = (event) => {
        let password = event.target.value;
        this.setState ({
            'password': password.trim()
        });
    };

    render() {
        return (
            <div id="login-main">
                <div className="lds-roller" hidden>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <LoginView
                    onUsernameChangeHandler={this.onUsernameChangeHandler}
                    onPasswordChangeHandler={this.onPasswordChangeHandler}
                    onLoginclickHandler={this.onLoginClickHandler}
                    errors={this.state.errors}
                />
            </div>
        );
    }
}

export default Login;