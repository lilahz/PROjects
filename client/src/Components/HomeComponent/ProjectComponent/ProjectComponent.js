import React, {Component} from 'react';
import {View, Mask, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle ,MDBBtn, MDBCardText, Row, MDBFooter} from 'mdbreact';
import '../ItemComponent.css';
import ProjectModalComponent from './ProjectModalComponent';
import {field_array} from '../data';
import { SocialIcon } from 'react-social-icons';

class ProjectComponent extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({modal: !this.state.modal});
    }

    ValueOption = (field) => (
        <div>
            {field.icon}
            {field.label}
        </div >
    );
    
    findArrayElementByField = (fieldValue) => (
        field_array.find((element) => {
          return element.value === fieldValue;
        })
    );
    
    fieldArrayIcon = (projectFields) => (
        projectFields.slice(0,3).map((field) => (
                (this.findArrayElementByField(field) === undefined ? "" : this.ValueOption(this.findArrayElementByField(field)))))
    );

    render () {
        const email_button = <SocialIcon className="SocialIcon" network="mailto" url={"mailto:" + this.props.modalEmail + "?subject=Bla"}  bgColor="#CD3636" fgColor="white"/>
        const companyURL_button = this.props.modalCompanyURL
                                    ? <SocialIcon className="SocialIcon" url={this.props.modalCompanyURL} target="_blank" fgColor="white"/>
                                    : null;
        const facebookURL_button = this.props.modalFacebookURL
                                    ? <SocialIcon className="SocialIcon" url={this.props.modalFacebookURL} target="_blank" fgColor="white"/>
                                    : null;
        const instagramURL_button = this.props.modalInstagramURL
                                    ? <SocialIcon className="SocialIcon" url={this.props.modalInstagramURL} target="_blank" fgColor="white"/>
                                    : null;
        return (
                <MDBCol md="4">
                    <MDBCard className="Card">
                    <View hover zoom>
                        <MDBCardImage className="Picture"
                            src={this.props.cardImage 
                                ? `data:image/jpeg;base64,${this.props.cardImage}`
                                : "https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"}
                            waves />
                        <Mask className="flex-center" overlay="white-light">
                            <MDBBtn onClick = { this.toggle }>קצת פרטים</MDBBtn>
                        </Mask>
                    </View>
                        <MDBCardBody className="Body">
                            <div className="InnerBody">
                                <MDBCardTitle className="Title">{this.props.cardTitle}</MDBCardTitle>
                                <MDBCardText className="Fields">{this.fieldArrayIcon(this.props.cardField)}</MDBCardText>  
                            </div>
                        </MDBCardBody>
                        <MDBFooter className="Footer">
                            {email_button}
                            {companyURL_button}
                            {facebookURL_button}
                            {instagramURL_button}
                        </MDBFooter>

                        <ProjectModalComponent className="Modal"
                            isOpen={this.state.modal} 
                            toggle={this.toggle}
                            modalTitle={this.props.cardTitle}
                            modalCardProjectDesc={this.props.cardProjectDesc}
                            modalCardCompDesc={this.props.cardCompDesc}
                            modalField={this.fieldArrayIcon(this.props.cardField)}
                            modalEmail={email_button}
                            modalCompanyURL={companyURL_button}
                            modalFacebookURL={facebookURL_button}
                            modalInstagramURL={instagramURL_button}
                        />
                    </MDBCard>
                </MDBCol>
        )
    }
}

export default ProjectComponent;