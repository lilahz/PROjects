import React, {Component} from 'react';
import {View, Mask, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBBtn, MDBCardText, MDBCardFooter, Row} from 'mdbreact';
import '../ItemComponent.css';
import JuniorModalComponent from './JuniorModalComponent';
import {field_array} from '../data';
import { SocialIcon } from 'react-social-icons';


class JuniorComponent extends Component {
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
    
    fieldArrayIconForCard = (juniorFields) => (
        juniorFields.slice(0,3).map((field) => (
                (this.findArrayElementByField(field) === undefined ? "" : this.ValueOption(this.findArrayElementByField(field)))))
    );

    fieldArrayIconForLearnMore = (juniorFields) => (
        juniorFields.map((field) => (
                (this.findArrayElementByField(field) === undefined ? "" : this.ValueOption(this.findArrayElementByField(field)))))
    );

    render () {

        const email_button = <SocialIcon className="SocialIcon" network="mailto" url={"mailto:" + this.props.cardEmail + "?subject=Bla"} bgColor="#CD3636" fgColor="white"/>;

        const personalURL_button = this.props.cardPersonalURL 
                                    ? <SocialIcon className="SocialIcon" url={this.props.cardPersonalURL} target="_blank" fgColor="white" />
                                    : null;
        const facebookURL_button = this.props.cardFacebookURL
                                    ? <SocialIcon className="SocialIcon" url={this.props.cardFacebookURL} target="_blank" fgColor="white" />
                                    : null;
        const instagramURL_button = this.props.cardInstagramURL
                                    ? <SocialIcon className="SocialIcon" url={this.props.cardInstagramURL} target="_blank" fgColor="white"/>
                                    : null;
        const linkedInURL_button = this.props.cardLinkedInURL 
                                    ? <SocialIcon className="SocialIcon" url={this.props.cardLinkedInURL} target="_blank" fgColor="white"/>
                                    : null;
        const gitHubURL_button = this.props.cardGitHubURL
                                    ? <SocialIcon className="SocialIcon" url={this.props.cardGitHubURL} target="_blank" fgColor="white"/>
                                    : null;
        return (
            <div className="Item">
                <MDBCol>
                    <MDBCard className="Card">
                    <View hover zoom>
                        <MDBCardImage 
                            className="Picture" 
                            src={this.props.cardImage 
                                ? `data:image/jpeg;base64,${this.props.cardImage}` 
                                : "https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"}
                            waves
                            />
                        <Mask className="flex-center"overlay="white-light">
                            <MDBBtn onClick = { this.toggle }>קצת פרטים</MDBBtn>
                        </Mask>
                    </View>
                    <MDBCardBody className="Body">
                        <MDBCardTitle className="Title">{this.props.cardTitle}</MDBCardTitle>
                        <MDBCardText className="Fields">{this.fieldArrayIconForCard(this.props.cardField)}</MDBCardText>
                        <Row className="Footer">
                            {email_button}
                            {personalURL_button}
                            {facebookURL_button}
                            {instagramURL_button}
                            {linkedInURL_button}
                            {gitHubURL_button}
                        </Row> 
                    </MDBCardBody>  
                    <JuniorModalComponent className="Modal"
                        isOpen={this.state.modal} 
                        toggle={this.toggle}
                        modalTitle={this.props.cardTitle}
                        modalDescription={this.props.cardText}
                        modalField={this.fieldArrayIconForLearnMore(this.props.cardField)}
                        modalEmail={email_button}
                        modalPersonalURL={personalURL_button}
                        modalFacebookURL={facebookURL_button}
                        modalInstagramURL={instagramURL_button}
                        modalLinkedInURL={linkedInURL_button}
                        modalGitHubURL={gitHubURL_button}
                    />
                    </MDBCard>
              </MDBCol>
            </div>
        )
    }
}

export default JuniorComponent;
