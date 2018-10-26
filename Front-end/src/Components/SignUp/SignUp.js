import React, { Component } from 'react';
import "../../Styles/signup.css";
import SignUpView from './SignUpView';
import axios from "axios";

class SignUp extends Component {

    state = {
        'firstName' : undefined,
        'lastName' : undefined,
        'email': undefined,
        'password': undefined,
        'errors': undefined
    };

    onSignUpClickHandler = (event) => {
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
                let bodyFormData = new FormData();
                bodyFormData.set("firstName", this.state.firstName);
                bodyFormData.set("lastName", this.state.lastName);
                bodyFormData.set("email", this.state.email);
                bodyFormData.set("password", this.state.password);
                axios({
                    method: 'post',
                    url: 'http://localhost/MyTasks/index.php?r=api/signup',
                    data: bodyFormData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                })
                    .then(function (response) {
                        console.log(response.data);
                        //self.setState({result: JSON.stringify(response.data)})
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        }else {
            this.setState({'errors': "Enter valid username and password, don't use white space"});
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
            <div>
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