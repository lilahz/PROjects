import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {MDBBtn, MDBCol, MDBRow} from 'mdbreact';
import {ReactComponent as Logo} from "../logo.svg"
import {ReactComponent as LandingImage} from './images/landingRightImage.svg';

import ProjectCarouselComponent from '../HomeComponent/ProjectComponent/ProjectCarouselComponent';
import NewProjectModalComponent from '../NewProjectComponent/NewProjectModalComponent'
import classes from  './LandingComponent.module.css';
import landingImage from './images/landing_image.png';
import { VscNewFile } from 'react-icons/vsc';
import Tooltip from "@material-ui/core/Tooltip";
import { UserContext } from '../../UserContext';

class LandingComponent extends Component {
    state = {
        modal: false
    }
    static contextType = UserContext;

    registerClickHandler = () => {
        console.log("registering");
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
    }

    render () {
        const context = this.context;

        return (
            <div>
            <div className={classes.LandingTop}>
                <div className={classes.LandingRight}>
                    <div className={classes.LandingRightLogo}>
                        <Logo fill="white" />
                    </div>
                    <div className={classes.LandingRightButtons}>
                        <MDBRow>
                            <MDBCol>
                                <MDBBtn className={classes.SignUpCompany} color="transparent white-text"
                                    onClick = { this.toggle }>
                                    הרשם כעמותה
                                </MDBBtn>
                            </MDBCol>
                            <MDBCol>
                                <MDBBtn className={classes.SignUpJunior} color="transparent white-text"
                                    onClick = { this.toggle }>
                                    הרשם כג'וניור
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </div>

                <div className={classes.LandingLeft}>
                    <LandingImage className={classes.LandingLeftImage}/>
                </div>
            </div>
            <div className={classes.LandingBottom}>
                <h1 dir="rtl">הפרוייקטים שלנו</h1>
                {/* <Tooltip title="See all Projects" position="top" >
                <MDBBtn className={classes.LandingBottomButton} href="/home/projects">הפרוייקטים שלנו</MDBBtn>
                </Tooltip> */}
                {/* <Tooltip title="New Project" position="right" >
                    <MDBBtn  className={classes.NewProject}
                        variant="outline-secondary"
                        onClick = { this.toggle }>
                        <VscNewFile size={16}/>
                    </MDBBtn>
                </Tooltip> */}
                <ProjectCarouselComponent/>
                <NewProjectModalComponent className="Modal"
                    isOpen={this.state.modal}
                    toggle={this.toggle}/>
            </div>
            </div>
            /* <Row>
                <Col xs={12} md={8} className="text-center"> 
                    <Tooltip title="See all Projects" placement="left-start" TransitionComponent={Fade} enterDelay={100} leaveDelay={100}>
                            <Button className="CarouselHeader"
                                href="/home/projects"
                                variant="outline-secondary"
                                style={{width: "500px"}}
                                block>
                                Our Open Projects
                            </Button>
                    </Tooltip>
                </Col>
                <Col xs={6} md={4}>
                    <Tooltip title="Open New Project" placement="left-start" TransitionComponent={Fade} enterDelay={100} leaveDelay={100}>
                        <Button className="CarouselHeaderButton"
                            variant="outline-secondary"
                            style={{width: "50px"}}
                            block
                            onClick = { this.toggle }>
                            <VscNewFile size={30}/>
                        </Button>
                    </Tooltip>
                </Col>
            </Row> */
        )
    }
}

export default LandingComponent;