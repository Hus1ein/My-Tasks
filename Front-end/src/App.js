import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Components/Home/home';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import Dashboard from './Components/Dashboard/dashboard';
import PrivateRoute from "./PrivateRoute";
import app from "./base";

class App extends Component {
    state = { loading: true, authenticated: false, user: null };
    componentWillMount() {
        app.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user,
                    loading: false
                });
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false
                });
            }
        });
    }
  render() {
      const { authenticated, loading } = this.state;
      if (loading) {
          return <p>Loading..</p>;
      }
    return (
        <Router>
            <div>
                <PrivateRoute
                    exact
                    path="/dashboard"
                    component={Dashboard}
                    authenticated={this.state.authenticated}
                />
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </div>
        </Router>
    );
  }
}

export default App;