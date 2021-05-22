import React, {Component} from 'react';
import {MDBCol, MDBRow} from 'mdbreact';

import ProjectCarouselComponent from '../HomeComponent/ProjectComponent/ProjectCarouselComponent';
import NewProjectModalComponent from '../NewProjectComponent/NewProjectModalComponent'
import classes from  './LandingComponent.module.css';
import { VscNewFile } from 'react-icons/vsc';
import Tooltip from "@material-ui/core/Tooltip";

class LandingComponent extends Component {
    state = {
        modal: false
    }

    registerClickHandler = () => {
        console.log("registering");
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
    }

    render () {
        return (
            <div>
            <div className={classes.LandingTop}>
                    <div className={classes.LandingTopButtons}> 
                        <MDBRow>
                            <MDBCol>
                                <button className={classes.SignUpButton} color="transparent" type="button">
                                    <a href="/register">הרשם כעמותה</a>
                                </button>
                            </MDBCol>
                            <MDBCol>
                                <button className={classes.SignUpButton} color="transparent" type="button">
                                    <a href="/register">הרשם כג'וניור</a>
                                </button>
                            </MDBCol>
                        </MDBRow>
                    </div>  
            </div>
            <div className={classes.LandingBottom}>
                <div className={classes.LandingBottomHeaderRight}>
                    <h1 dir="rtl">הפרויקטים שלנו</h1>
                    <div className={classes.LandingBottomUnderline}></div>
                </div>
                <div className={classes.LandingBottomHeaderLeft}>
                    <MDBRow>
                        <MDBCol>
                            <button className={classes.LandingBottomHeaderLeftButton} type="button">
                                <a href="/home/projects"><b>כל הפרויקטים</b></a>
                            </button>
                        </MDBCol>
                        <MDBCol>
                            <button className={classes.LandingBottomHeaderLeftButton} type="button" onClick={this.toggle}>
                                פרויקט חדש
                            </button>
                        </MDBCol>
                    </MDBRow>
                </div>
                {/*
                    <MDBBtn  className={classes.NewProject}
                        variant="outline-secondary"
                        onClick = { this.toggle }>
                        <VscNewFile size={16}/>
                    </MDBBtn>
                 */}
                <ProjectCarouselComponent className={classes.LandingBottomCarousel}/>
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