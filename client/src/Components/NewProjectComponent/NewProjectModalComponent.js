import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from 'reactstrap';
import axios from 'axios';
import NewProjectForm from './NewProjectForm';
import { MDBBtn, MDBIcon } from 'mdbreact';

import { UserContext } from '../../UserContext';


class NewProjectModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        company_id: "1",
        field: [],
        status: "todo",
        description: "",
        errors: {},
        visible : false
    });

    static contextType = UserContext;

    onShowAlert = (toggle) =>{
        this.setState({visible:true},()=>{
          window.setTimeout(()=>{
            toggle();
            this.setState({visible:false})
          },3000)
        });
    }

    validate = () => {
        let errors = {};
        
        if (this.state.description === '') errors.description = 'שדה זה הינו חובה.';
        if (this.state.field === [] || this.state.field === null || this.state.field.length === 0) errors.field = 'שדה זה הינו חובה.';
        return errors;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    submitForm = (data) => {
        const url = '/api/new_project';
        axios.post(url, data)
        .catch(error => console.error("Error:", error))
        .then(response => console.log("Success:", response));
    }

    handleSubmit = (toggle) => {
        const errors = this.validate();  
        const data = { "company_id":this.state.company_id, 
                        "field":this.state.field,
                        "status":this.state.status,
                        "description":this.state.description
                        };
        
        if (Object.keys(errors).length === 0) {
            console.log(data);
            this.submitForm(data); // send the data to the server
            this.setState(this.getInitialState()); // if success, reset all fields
            this.onShowAlert(toggle);
        } else {
            this.setState({ errors : errors });
        }                
    }

    onChangefield = selected => {
        let statusFilter = [];
        if(selected != null && selected.length > 0) {
            let valuesArrObj = selected.reduce((acc, current) => acc.concat(current.value), []);
            statusFilter = valuesArrObj;
        }
        this.setState({field: statusFilter});
    }


    render() {
        const context = this.context;
        const { errors } = this.state;
        const showAlert = this.state.visible ? 
                    <Alert style={{textAlign:"center"}} variant="success">
                        פרוייקט נוצר בהצלחה!</Alert> : null;
        return (
            <div>
            <Modal show={this.props.isOpen} onHide={this.props.toggle} key={this.props.key}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-70w"
                className="newProjectModal">
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter"> יצירת פרוייקט חדש </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewProjectForm errors={errors} state={this.state} handleChange={this.handleChange} onChangefield={this.onChangefield} />
                </Modal.Body>
                <div className="text-center">
                    <MDBBtn outline color="secondary" onClick={() => this.handleSubmit(this.props.toggle)}>
                           אישור
                        <MDBIcon far icon="paper-plane" className="ml-1" />
                    </MDBBtn>
                </div>
                {showAlert}
            </Modal>
            </div>
        );
    }
}

export default NewProjectModalComponent;