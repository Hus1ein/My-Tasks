import React, { Component } from 'react';
import "../../Styles/signup.css";
import SignUpView from './SignUpView';
import app from "../../base";

class SignUp extends Component {

    state = {
        'firstName' : undefined,
        'lastName' : undefined,
        'email': undefined,
        'password': undefined,
        'errors': undefined
    };

    onSignUpClickHandler = async (event) => {
        event.preventDefault();
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let password = this.state.password;
        if (email !== undefined && email !== "" && password !== undefined && password !== ""
            && email.indexOf(" ") === -1 && password.indexOf(" ") === -1 &&
            firstName !== undefined && firstName !== "" && lastName !== undefined && lastName !== "" &&
            firstName.indexOf(" ") === -1 && lastName.indexOf(" ") === -1){

            if (password.length < 8) {
                this.setState({'errors': "Password must be more than 8 characters"});
            } else {
                this.setState({'errors': undefined});
                let self = this;
                document.getElementById("sign-up-view-main").hidden = true;
                document.getElementsByClassName("lds-roller")[0].hidden = false;
                try {
                    const user = await app
                        .auth()
                        .createUserWithEmailAndPassword(this.state.email, this.state.password);
                    document.getElementById("sign-up-view-main").hidden = false;
                    document.getElementsByClassName("lds-roller")[0].hidden = true;
                    this.props.history.push("/login");
                } catch (error) {
                    document.getElementById("sign-up-view-main").hidden = false;
                    document.getElementsByClassName("lds-roller")[0].hidden = true;
                    this.setState({'errors': "Error, Check inputs and try again."});
                }
            }

        }else {
            this.setState({'errors': "Enter valid values"});
        }

    };

    onFirstNameChangeHandler = (event) => {
        let firstName = event.target.value;
        this.setState ({
            'firstName': firstName.trim()
        });
    };

    onLastNameChangeHandler = (event) => {
        let lastName = event.target.value;
        this.setState ({
            'lastName': lastName.trim()
        });
    };

    onEmailChangeHandler = (event) => {
        let email = event.target.value;
        this.setState ({
            'email': email.trim()
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
            <div id="sign-up-main">
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
                <SignUpView
                    onFirstNameChangeHandler={this.onFirstNameChangeHandler}
                    onLastNameChangeHandler={this.onLastNameChangeHandler}
                    onEmailChangeHandler={this.onEmailChangeHandler}
                    onPasswordChangeHandler={this.onPasswordChangeHandler}
                    onSignUpClickHandler={this.onSignUpClickHandler}
                    errors={this.state.errors}
                />
            </div>
        );
    }
}

export default SignUp;