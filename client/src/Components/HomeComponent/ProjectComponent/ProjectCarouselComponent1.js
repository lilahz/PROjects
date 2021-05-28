import React, {Component} from 'react';
import axios from 'axios';

import ProjectComponent from './ProjectComponent';
import './ProjectCarouselComponent.css';
import { MDBRow } from "mdbreact";

class ProjectCarouselComponent1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        axios.get("/api/home/projects")
            .then(response => {
                this.setState({
                    isLoaded: true,
                    items: response.data});
            })
    }

    render () {
        const {items} = this.state

        const firstItem = <MDBRow>
                              {items.slice(0,3).map((project) => (
                                  <ProjectComponent class="ProjectComponent" key={project.id} 
                                      cardTitle={project.company_name} 
                                      cardProjectDesc={project.description} 
                                      cardCompDesc={project.company_description}
                                      cardField={project.field}
                                      cardImage={project.company_profile_picture}
                                      cardEmail={project.company_email}
                                      cardCompanyURL={project.company_url}
                                      cardFacebookURL={project.facebook_url}
                                      cardInstagramURL={project.instagram_url}/> ))}
                          </MDBRow>;
        
        const secondItem = <MDBRow>
                              {items.slice(3,6).map((project) => (
                                  <ProjectComponent key={project.id} 
                                      cardTitle={project.company_name} 
                                      cardProjectDesc={project.description} 
                                      cardCompDesc={project.company_description}
                                      cardField={project.field}
                                      cardImage={project.company_profile_picture}
                                      cardEmail={project.company_email}
                                      cardCompanyURL={project.company_url}
                                      cardFacebookURL={project.facebook_url}
                                      cardInstagramURL={project.instagram_url}/> ))}
                          </MDBRow>

        const thirdItem = <MDBRow>
                              {items.slice(6,9).map((project) => (
                                  <ProjectComponent key={project.id} 
                                      cardTitle={project.company_name} 
                                      cardProjectDesc={project.description} 
                                      cardCompDesc={project.company_description}
                                      cardField={project.field}
                                      cardImage={project.company_profile_picture}
                                      cardEmail={project.company_email}
                                      cardCompanyURL={project.company_url}
                                      cardFacebookURL={project.facebook_url}
                                      cardInstagramURL={project.instagram_url}/> ))}
                          </MDBRow>

        return (
          <div id="carouselIndicators" class="carousel slide carousel-fade" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselIndicators" data-slide-to="1"></li>
              <li data-target="#carouselIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                {firstItem}
              </div>
              <div class="carousel-item">
                {secondItem}
              </div>
              <div class="carousel-item">
                {thirdItem}
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

        )
    }
}

export default ProjectCarouselComponent1;
