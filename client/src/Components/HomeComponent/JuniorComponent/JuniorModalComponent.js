import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import '../../Modal.css';

class JuniorModalComponent extends Component {

render() {

    return (
        <Modal show={this.props.isOpen} onHide={this.props.toggle} key={this.props.key}
            aria-labelledby="contained-modal-title-vcenter"
            centered className="modal">
            <div className="modalTitleTop">
                <Modal.Title className="modalTitle" id="contained-modal-title-vcenter">
                {this.props.modalTitle}
                </Modal.Title>
                <div className="modalTitleUnderline"></div>
            </div> 

            <Modal.Body className="modalBody">
                <div>
                    <h3 className="modalFieldTitle">יכול/ה לסייע עם </h3>
                    {this.props.modalField}<br />
                </div>
                <div>
                    <h3 className="modalDescTitle">קצת עליי </h3>
                    <p className="modalDescBody">{this.props.modalDescription}<br /><br /></p>
                </div>
            </Modal.Body>
            <div className="modalFooter">
                {this.props.modalEmail}
                {this.props.modalPersonalURL}
                {this.props.modalFacebookURL}
                {this.props.modalInstagramURL}
                {this.props.modalLinkedInURL}
                {this.props.modalGitHubURL}
            </div>
        </Modal>
        );
    }
}

export default JuniorModalComponent;