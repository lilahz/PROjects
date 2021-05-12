import React from 'react';
import { FormGroup, FormFeedback, Input} from 'reactstrap';
import {field_array} from '../HomeComponent/data';
import FilterComponent from '../HomeComponent/FilterComponent'
import './NewProjectForm.css';

const NewProjectForm = (props) => (
    <div>
        <FormGroup className="FormGroup">
            <Input id="company_name" type="text" value={props.state.company_name} 
                    placeholder={localStorage.getItem('currentUserEmail')} disabled/>
        </FormGroup>
        <FormGroup className="FormGroup">
            <FilterComponent style={{backgroundColor: '#FFF6EB'}}
                place_holder = "תחום עיסוק *"
                filter_array = {field_array}
                handle_on_change = {props.onChangefield} />
            <FormFeedback>{props.errors.description}</FormFeedback>
        </FormGroup>
        <FormGroup className="FormGroup">
            <Input style={{backgroundColor: '#FFF6EB'}} id="description" type="text" value={props.description} maxLength="200" onChange={props.handleChange}
                   invalid={props.errors.description ? true : false} placeholder="ספר קצת על הפרוייקט *"/>
            <FormFeedback>{props.errors.description}</FormFeedback>
        </FormGroup>
    </div>
    );

export default NewProjectForm;