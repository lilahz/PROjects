import React, { Component } from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import {IoPersonAdd} from 'react-icons/io5';
import Modal from "react-bootstrap/Modal";
import '../Modal.css';


class ProjectModalComponent extends Component {

    render() {

        return (
            <Modal show={this.props.isOpen} onHide={this.props.toggle} key={this.props.key}
                aria-labelledby="contained-modal-title-vcenter"
                centered className="modal">
                <div className="modalTitleTop">
                    <Modal.Title className="modalTitle" id="contained-modal-title-vcenter">
                        פרוייקט ל{this.props.modalTitle}
                    </Modal.Title>
                    <div className="modalTitleUnderline"></div>
                </div> 

                <Modal.Body className="modalBody">
                    <div>
                        <h3 className="modalFieldTitle">מחפשים עזרה עם</h3>
                        {this.props.modalField}<br />
                    </div>
                    <div>
                        <h3 className="modalDescTitle">קצת עלינו</h3>
                        <p className="modalDescBody">{this.props.modalCardCompDesc}<br /><br /></p>
                    </div>
                    <div>
                        <h3 className="modalDescTitle">קצת על הפרוייקט</h3>
                        <p className="modalDescBody">{this.props.modalCardProjectDesc}<br /><br /></p>
                    </div>
                </Modal.Body>
                <div className="modalFooter">
                    {/* <Tooltip title="Join Project" placement="left-start" TransitionComponent={Fade} enterDelay={100} leaveDelay={100}>
                        <MDBBtn className="float-left col-sm-2" href="#" >
                            <IoPersonAdd size={25}/></MDBBtn>
                    </Tooltip> */}
                    <div>
                        {this.props.modalEmail}
                        {this.props.modalCompanyURL}
                        {this.props.modalFacebookURL}
                        {this.props.modalInstagramURL}
                    </div>
                </div>
            </Modal>
            );
        }
}

export default ProjectModalComponent;