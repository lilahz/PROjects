import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { SocialIcon } from 'react-social-icons';

class JuniorModalComponent extends Component {

render() {

    return (
        <Modal show={this.props.isOpen} onHide={this.props.toggle} key={this.props.key}
            //size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            dialogClassName="modal-70w"
            className="JuniorModal">
            <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
               <b>{this.props.modalTitle}</b>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "right"}}>
                <u>יכול/ה לסייע עם</u><br/> {this.props.modalField} <br />
                <u>קצת עליי</u><br/> {this.props.modalDescription}
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <div className="float-right">
                        {this.props.modalEmail}
                        {this.props.modalPersonalURL}
                        {this.props.modalFacebookURL}
                        {this.props.modalInstagramURL}
                        {this.props.modalLinkedInURL}
                        {this.props.modalGitHubURL}
                    </div>
                </Row>        
            </Modal.Footer>
        </Modal>
        );
    }
}

export default JuniorModalComponent;