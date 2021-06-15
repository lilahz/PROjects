import React, {Component} from 'react';
import {MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBFooter} from 'mdbreact';
import { SocialIcon } from 'react-social-icons';

import classes from './TeamComponent.module.css';

class TeamComponent extends Component {
    render () {
        const email_button = <SocialIcon className={classes.SocialIcon} network="mailto" url={"mailto:" + this.props.cardEmail} bgColor="#CD3636" fgColor="white"/>;
        const facebookURL_button = <SocialIcon className={classes.SocialIcon} url={this.props.cardFB} target="_blank" fgColor="white" />;
        const linkedInURL_button = <SocialIcon className={classes.SocialIcon} url={this.props.cardLD} target="_blank" fgColor="white"/>;

        return (
            <MDBCol md="4">
                <MDBCard className={classes.Card}>
                    <MDBCardImage className={classes.Picture} 
                        src={this.props.cardImage} waves />
                    <MDBCardBody className={classes.Body}>
                        <MDBCardTitle className={classes.Title}>{this.props.cardTitle}</MDBCardTitle>
                        <MDBCardText className={classes.Text}>{this.props.cardText}</MDBCardText>
                    </MDBCardBody>
                    <MDBFooter className={classes.Footer}>
                        {email_button}
                        {facebookURL_button}
                        {linkedInURL_button}
                    </MDBFooter>
                </MDBCard>
            </MDBCol>
        )
    }
}

export default TeamComponent;
