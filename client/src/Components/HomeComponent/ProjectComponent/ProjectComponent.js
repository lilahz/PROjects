import React, {Component} from 'react';
import {View, Mask, MDBCol, MDBCard, MDBCardBody, MDBCardTitle ,MDBRow, MDBCardText, MDBFooter} from 'mdbreact';
import '../ItemComponent.css';
import ProjectModalComponent from './ProjectModalComponent';
import {field_array} from '../data';
import { SocialIcon } from 'react-social-icons';
import defaultProfilePic from './images/default_profile_pic.jpg';

class ProjectComponent extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
    }

    ValueOption = (field) => (
        <div className="Field">
            <span>{field.icon} &nbsp; &nbsp;</span>
            {field.label}
        </div >
    );
    
    findArrayElementByField = (fieldValue) => (
        field_array.find((element) => {
          return element.value === fieldValue;
        })
    );
    
    fieldArrayIconForModal = (projectFields) => (
        projectFields.map((field) => (
                (this.findArrayElementByField(field) === undefined ? "" : this.ValueOption(this.findArrayElementByField(field)))))
    );

    fieldArrayIconForCard = (projectFields) => (
        projectFields.slice(0,4).map((field) => (
                (this.findArrayElementByField(field) === undefined ? "" : this.ValueOption(this.findArrayElementByField(field)))))
    );


    render () {
        const email_button = <SocialIcon className="SocialIcon" network="mailto" url={"mailto:" + this.props.cardEmail + "?subject=Bla"}  bgColor="#CD3636" fgColor="white"/>
        const companyURL_button = this.props.cardCompanyURL
            ? <SocialIcon className="SocialIcon" url={this.props.cardCompanyURL} target="_blank" fgColor="white"/>
            : null;
        const facebookURL_button = this.props.cardFacebookURL
            ? <SocialIcon className="SocialIcon" url={this.props.cardFacebookURL} target="_blank" fgColor="white"/>
            : null;
        const instagramURL_button = this.props.cardInstagramURL
            ? <SocialIcon className="SocialIcon" url={this.props.cardInstagramURL} target="_blank" fgColor="white"/>
            : null;
        return (
            <MDBCol md="4">
                <MDBCol className="Item">
                    <MDBCard className="Card">
                        <MDBCardBody className="Body">
                            <View  hover zoom className="Picture"  >
                                <img style={{width:"100%",height:"100%"}}
                                    src={this.props.cardImage 
                                        ? `data:image/jpeg;base64,${this.props.cardImage}`
                                        : defaultProfilePic}
                                    waves >
                                </img>
                                <Mask>
                                    <button className="HoverButton" onClick = { this.toggle }>עוד פרטים</button>
                                </Mask>
                            </View>
                            <MDBCardTitle className="Title">{this.props.cardTitle}</MDBCardTitle>
                            <MDBCardText className="Fields">{this.fieldArrayIconForCard(this.props.cardField)}</MDBCardText>
                        </MDBCardBody>
                        <MDBFooter className="Footer">
                                {email_button}
                                {companyURL_button}
                                {facebookURL_button}
                                {instagramURL_button}
                        </MDBFooter>
                    </MDBCard>
                    <ProjectModalComponent className="Modal"
                        isOpen={this.state.modal} 
                        toggle={this.toggle}
                        modalTitle={this.props.cardTitle}
                        modalCardProjectDesc={this.props.cardProjectDesc}
                        modalCardCompDesc={this.props.cardCompDesc}
                        modalField={this.fieldArrayIconForModal(this.props.cardField)}
                        modalEmail={email_button}
                        modalCompanyURL={companyURL_button}
                        modalFacebookURL={facebookURL_button}
                        modalInstagramURL={instagramURL_button}
                    />
                </MDBCol>
            </MDBCol>
        )
    }
}

export default ProjectComponent;