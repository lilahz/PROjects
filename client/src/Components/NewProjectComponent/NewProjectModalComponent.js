import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
// import {Button} from 'react-bootstrap';
import {Alert, Form, Button, FormGroup, FormFeedback, Input} from 'reactstrap';
import FilterComponent from '../HomeComponent/FilterComponent';
import {field_array} from '../HomeComponent/data';
import axios from 'axios';


class NewProjectModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        company_id: "2",
        field: [],
        status: "todo",
        description: "",
        errors: {},
        visible : false
    });

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
        
        if (this.state.description === '') errors.description = 'Please tell us about your project.';
        if (this.state.field === [] || this.state.field === null || this.state.field.length === 0) errors.field = 'Please enter the field of work..';
        return errors;
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    submitForm = (data) => {
        const url = '/api/new_project';
        const requestOptions = {
            method: 'POST',
            cache: "no-cache",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        axios.post(url, data)
        .then(res => res.json())
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
        const { errors } = this.state;
        const showAlert = this.state.visible ? 
                    <Alert style={{textAlign:"center"}} variant="success">
                        Project Created Successfully!</Alert> : null;
        return (
            <div>
            <Modal show={this.props.isOpen} onHide={this.props.toggle} key={this.props.key}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-70w"
                className="newProjectModal">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter"> New Project Form </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Input id="company_name" type="text" value={this.state.company_name} 
                                 placeholder="* Company Name" disabled/>
                    </FormGroup>
                    <FormGroup>
                        <FilterComponent    
                                place_holder = "Choose field of Work"
                                filter_array = {field_array}
                                handle_on_change = {this.handleChangeField} />
                        <FormFeedback>{errors.description}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input id="description" type="text" value={this.state.description} maxLength="200" onChange={this.handleChange}
                                invalid={errors.description ? true : false} placeholder="* Description : (200 max)"/>
                        <FormFeedback>{errors.description}</FormFeedback>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.handleSubmit(this.props.toggle)}> Submit </Button>       
                </Modal.Footer>
                {showAlert}
            </Modal>
            </div>
        );
    }
}

export default NewProjectModalComponent;