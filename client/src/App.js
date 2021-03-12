import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios';

import './App.css';
import NavBarComponent from './Components/NavBarComponent/NavBarComponent';
import LandingComponent from './Components/LandingComponent/LandingComponent';
import ProjectCarouselComponent from './Components/HomeComponent/ProjectComponent/ProjectCarouselComponent';
import RegisterComponent from './Components/RegisterComponent/RegisterComponent';
import AllProjects from './Components/HomeComponent/ProjectComponent/AllProjects';
import AllJuniors from './Components/HomeComponent/JuniorComponent/AllJuniors';
import AboutComponent from './Components/AboutComponent/AboutComponent';

axios.default.baseURL = 'http://127.0.0.1:5000';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBarComponent />
          <div className="App">
            <Route exact path="/" component={LandingComponent}>
              <LandingComponent />
              <ProjectCarouselComponent />
            </Route>
            <Route path="/register">
              <RegisterComponent />
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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
