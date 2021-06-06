import React from 'react';
import { FormGroup, Input} from 'reactstrap';
import './LoginForm.css';


const LoginForm = (props) => (
    <div>
        <FormGroup className="formGroup">
            <Input id="email" type="email" value={props.state.email} onChange={props.handleChangeUserName}
            placeholder=" מייל *" />
        </FormGroup>

        <FormGroup className="formGroup">
            <Input id="password" type="password" value={props.state.password} onChange={props.handleChangePassword}
                placeholder=" סיסמא *" />
        </FormGroup>
    </div>
);

export default LoginForm;