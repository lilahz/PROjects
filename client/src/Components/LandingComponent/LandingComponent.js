import React, {Component} from 'react';
import {MDBCol, MDBRow} from 'mdbreact';
import ProjectCarouselComponent1 from '../HomeComponent/ProjectComponent/ProjectCarouselComponent1';
import NewProjectModalComponent from '../NewProjectComponent/NewProjectModalComponent'
import classes from  './LandingComponent.module.css';
import {ReactComponent as NewProject} from './images/NewProject.svg';
import { UserContext } from '../../UserContext';
import { connect } from 'react-redux';


class LandingComponent extends Component {
    state = {
        modal: false
    }
    static contextType = UserContext;

    registerClickHandler = () => {
        console.log("registering");
    }

    toggle = () => {
        if (!this.props.userAuth.loggedIn && localStorage.getItem('currentUserType') !== 'company') {
            alert("רק חברות רשומות יכולות להוסיף פרויקטים חדשים");
            return;
        }
        this.setState({modal: !this.state.modal});
    }

    render () {
        return (
            <div>
            <div className={classes.LandingTop}>
                {this.props.userAuth.loggedIn ? null :
                    <div className={classes.LandingTopButtons}>
                        <MDBRow>
                            <MDBCol>
                                <button className={classes.SignUpButton} type="button">
                                    <a href="/register">הרשם כעמותה</a>
                                </button>
                            </MDBCol>
                            <MDBCol>
                                <button className={classes.SignUpButton} type="button">
                                    <a href="/register">הרשם כג'וניור</a>
                                </button>
                            </MDBCol>
                        </MDBRow>
                    </div>}
            </div>
            <div className={classes.AllItemsHeaderRight}>
                    <h1 dir="rtl">הפרוייקטים שלנו</h1>
                    <div className={classes.AllItemsHeaderUnderline}></div>
            </div>
            <div className={classes.LandingBottom}>
                <div className={classes.LandingBottomHeaderLeft}>
                    <MDBRow>
                        <MDBCol>
                            <button className={classes.LandingBottomHeaderLeftButton} type="button">
                                <a href="/home/projects"><b>כל הפרויקטים</b></a>
                            </button>
                        </MDBCol>
                        <MDBCol>
                            <div className={classes.NewProjectButton}>
                                <button className={classes.LandingBottomHeaderNewProjectButton} type="button" onClick={this.toggle}>
                                    <NewProject className={classes.NewProjectSVG}/>
                                </button>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </div>
                <div className={classes.LandingBottomCarousel}>
                    <ProjectCarouselComponent1 />
                </div>
                <NewProjectModalComponent
                    isOpen={this.state.modal} 
                    toggle={this.toggle}/>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userAuth: state
    };
  }

export default connect(mapStateToProps)(LandingComponent);