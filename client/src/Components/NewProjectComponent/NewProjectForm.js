import React from 'react';
import { FormGroup, Input} from 'reactstrap';
import './NewProjectForm.css';

const NewProjectForm = (props) => (
    <div>
        <FormGroup className="formGroup">
            <Input id="company_name" type="text" value={props.state.company_name} 
                    placeholder={localStorage.getItem('email')} disabled/>
        </FormGroup>
        <FormGroup className="formGroup">
            <Input id="description" type="text" value={props.description} maxLength="200" onChange={props.handleChange}
                   placeholder="ספרו על הפרוייקט *"/>
        </FormGroup>
        <h3 className="fieldHeader">בחר תחומי עיסוק</h3>
        {props.filterButtons}
    </div>
    );

export default NewProjectForm;