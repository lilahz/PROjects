import React from 'react';
import { FormGroup, Input, Col, Row} from 'reactstrap';
import './RegisterForm.css';
import { FaPlus, FaMinus } from "react-icons/fa";


const RegisterJuniorFormFirst = (props) => (    
    <div>
        <FormGroup className="formGroup">
            <Input id="full_name" type="text" value={props.state.full_name} onChange={props.onChangeFullName} 
                placeholder="שם מלא *"/>
        </FormGroup>
        <FormGroup className="formGroup">
            <Input id="email" type="email" value={props.state.email} onChange={props.onChangeUserName}
                 placeholder="מייל *" />
        </FormGroup>
        <FormGroup className="formGroup">
            <Input id="password" type="password" value={props.state.password} onChange={props.onChangePassword}
               placeholder="סיסמא *" />
        </FormGroup>
        <FormGroup className="formGroup">
            <Input id="confirm_password" type="password" value={props.state.confirm_password} onChange={props.onChangeRePassword}
                placeholder="הקלד שנית את הסיסמא *" />
        </FormGroup>
    </div>
)

const RegisterJuniorFormSecond = (props) => ( 
    <div>   
        <h3 className="fieldHeader">בחר תחומי עיסוק</h3>
        {props.filterButtons}
        <div className="restGroups">
            <FormGroup className="formGroup">
                <Input id="about_me" type="text" value={props.state.about_me} onChange={props.onChangeAbout}
                    placeholder="ספר קצת על עצמך *" />
            </FormGroup>
            {props.state.website.map((x, i) => {
                return (
                <Row>
                <Col>
                    <FormGroup className="formGroupWebsiteLabel">
                        <Input id="website_label" type="select" value={x.label} onChange={e=>props.handleChangeWebsite(e,i,'label')}>
                            <option>אתר אישי</option>
                            <option>פייסבוק</option>
                            <option>אינסטגרם</option>
                            <option>לינקדין</option>
                            <option>גיטהאב</option>
                        </Input>
                    </FormGroup>
                </Col>   
                <Col>
                <FormGroup className="formGroup">
                    <Input id="website" type="text" value={x.url} onChange={e=>props.handleChangeWebsite(e,i,'url')}
                        placeholder="לינק" />
            </FormGroup>
                </Col>
                <Col>
                    {props.state.website.length !== 1 && 
                        <button className="iconButtons" onClick={() => props.handleRemoveClick(i)}> <FaMinus/> </button>}
                    {props.state.website.length - 1 === i && 
                        <button className="iconButtons" onClick={() => props.handleAddClick(i)}> <FaPlus/> </button>}
                </Col>
                </Row>); })}
            <FormGroup className="formGroup">
                <Input type="file" name="profile_picture" id="profile_picture" accept="image/* "
                    onChange={props.handleChangePicture}/>
            </FormGroup>
        </div>
    </div>   
)

export {RegisterJuniorFormFirst, RegisterJuniorFormSecond };