import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Components/Home/home';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

class App extends Component {


  render() {

    return (
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </div>
        </Router>
    );
  }
}

export default App;