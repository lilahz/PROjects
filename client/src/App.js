import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import './App.css';
import { UserProvider } from './UserContext';
import NavBarComponent from './Components/NavBarComponent/NavBarComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';
import LandingComponent from './Components/LandingComponent/LandingComponent';
import RegisterComponent from './Components/RegisterComponent/RegisterComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import LogoutComponent from './Components/LogoutComponent/LogoutComponent';
import AllProjects from './Components/HomeComponent/ProjectComponent/AllProjects';
import AllJuniors from './Components/HomeComponent/JuniorComponent/AllJuniors';
import AboutComponent from './Components/AboutComponent/AboutComponent';
import { authActions } from './actions';

// axios.default.baseURL = 'https://projects-21.herokuapp.com';
axios.default.baseURL = 'http://127.0.0.1:5000';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  render() {
    console.log("App props:", this.props);

    return (
      <BrowserRouter>
        <UserProvider>
          <div>
            <NavBarComponent />
            <div className="App">
              <Route exact path="/" component={LandingComponent}>
                <LandingComponent />
              </Route>
              <Route path="/register">
                <RegisterComponent />
              </Route>
              <Route path="/login">
                <LoginComponent />
              </Route>
              <Route path="/logout">
                <LogoutComponent />
              </Route>
              <Route path="/home/projects">
                <AllProjects />
              </Route>
              <Route path="/home/juniors">
                <AllJuniors />
              </Route>
              <Route path="/home/about">
                <AboutComponent />
              </Route>
            </div>
            {/* <FooterComponent /> */}
          </div>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuth: state
  };
}

const mapAction = {
  login: authActions.login,
  logout: authActions.logout
}

export default connect(mapStateToProps, mapAction)(App);
