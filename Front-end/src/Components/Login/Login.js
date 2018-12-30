import React, { Component } from 'react';
import "../../Styles/login.css";
import LoginView from './LoginView';
import axios from "axios";
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
            /*let bodyFormData = new FormData();
            bodyFormData.set("username", this.state.username);
            bodyFormData.set("password", this.state.password);
            axios({
                method: 'post',
                url: 'http://localhost/MyTasks/Back-end/index.php?r=api/login',
                data: bodyFormData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                console.log(response.data);
                localStorage.setItem("session_id", response.data.session_id);
                //self.setState({result: JSON.stringify(response.data)})
            })
            .catch(function (error) {
                console.log(error);
            });*/
            try {
                const user = await app
                    .auth()
                    .signInWithEmailAndPassword(this.state.username, this.state.password);

                console.log(user);
                this.props.history.push("/go");
            } catch (error) {
                alert(error);
            }

        }else {
            this.setState({'errors': "Enter valid username and password, don't use white space"});
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
            <div>
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