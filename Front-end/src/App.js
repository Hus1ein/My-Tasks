import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from './Components/Home/home';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';

class App extends Component {

  changeView = (view) => {
      this.setState ({
          'view': view
      });
  };

  state = {
      'view': <Home changeView={this.changeView}/>,
  };

  render() {

    return (
        <Router>
            <div>
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
            </div>
        </Router>
    );
  }
}

export default App;
