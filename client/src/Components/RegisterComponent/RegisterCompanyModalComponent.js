import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Modal from "react-bootstrap/Modal";
import {Alert, Button, Spinner} from 'reactstrap';
import axios from 'axios';
import {RegisterCompanyFormFirst, RegisterCompanyFormSecond} from './RegisterCompanyForm';
import { authActions } from '../../actions';
import './RegisterJuniorModal.css';

class RegisterCompanyModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        company_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        website: [{label: 'אתר החברה', url: ''}],
        about_me: '',
        profile_picture: '',
        companyNameReady: false,
        userNameReady: false,
        passwordReady: false,
        repasswordReady: false,
        aboutReady: false,
        formReadyFirst: false,
        formReadySecond: false,
        submit_error: '',
        visible_success: false,
        visible_error: false,
        loading: false,
        currentModal: 0,
    });

    onShowAlert = () =>{
        this.setState({visible:true},()=>{
          window.setTimeout(()=>{
            // toggle();
            this.setState({visible:false})
          },3000)
        });
    }

        
    // handle input change
    handleChangeWebsite = (e, index, field) => {
        const { value } = e.target;
        const values = this.state.website;
        field === 'label' ? values[index]['label'] = value : values[index]['url'] = value;
        this.setState({website: values});
    };

    // handle click event of the Remove button
    handleRemoveClick = index => {
        const list = [
            ...this.state.website.slice(0, index),
            ...this.state.website.slice(index + 1)
        ]
        this.setState({website: list});
    };

    // handle click event of the Add button
    handleAddClick = () => {
        const values = this.state.website;
        values.push({
            label: 'אתר החברה',
            url: ''
        });
        this.setState({website : values});
    };

    onChangeCompanyName = event => {
        let companyNameReady = event.target.value ? true : false;
        let formTillNow = this.state.userNameReady && this.state.passwordReady && this.state.repasswordReady;

        let formReadyFirst = formTillNow && companyNameReady;

        this.setState({
          [event.target.id]: event.target.value,
          companyNameReady: companyNameReady, 
          formReadyFirst: formReadyFirst
        });
    }

    onChangeUserName = event => {
        let userNameReady = event.target.value ? true : false;
        let formTillNow = this.state.companyNameReady && this.state.passwordReady && this.state.repasswordReady;

        let formReadyFirst = formTillNow && userNameReady;

        this.setState({
          [event.target.id]: event.target.value,
          userNameReady: userNameReady, 
          formReadyFirst: formReadyFirst
        });
    }

    onChangePassword = event => {
        let passwordReady = event.target.value ? true : false;
        let formTillNow = this.state.companyNameReady && this.state.userNameReady && this.state.repasswordReady;

        let formReadyFirst = formTillNow && passwordReady;

        this.setState({
          [event.target.id]: event.target.value,
          passwordReady: passwordReady, 
          formReadyFirst: formReadyFirst
        });
    }
    
    onChangeRePassword = event => {
        let repasswordReady = event.target.value ? true : false;
        let formTillNow = this.state.companyNameReady && this.state.userNameReady && this.state.passwordReady;
        let formReadyFirst = formTillNow && repasswordReady;
        
        formReadyFirst = formReadyFirst && (this.state.confirm_password !== this.state.password);
        
        this.setState({
          [event.target.id]: event.target.value,
          repasswordReady: repasswordReady, 
          formReadyFirst: formReadyFirst
        });
    }
    
    onChangeAbout = event => {
        let aboutReady = event.target.value ? true : false;
        let formReadySecond = true && aboutReady;
        this.setState({
          [event.target.id]: event.target.value,
          aboutReady: aboutReady,
          formReadySecond: formReadySecond
        });
    }


    _handleReaderLoaded = (readerEvt) => {
        let binaryString = btoa(readerEvt.target.result);
        this.setState({profile_picture: binaryString});
    }

    handleChangePicture = selected => {
        let file = selected.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
    }

    submitForm = (data) => {
        this.setState({loading:true}, () => {
            const url = '/api/auth/company_register';
            axios.post(url, data)
            .then(response => {
                this.setState({loading: false});
                this.setState({visible_error : false});
                this.setState({visible_success : true});
                console.log("respone data : " + response.data);
                console.log("response status : " + response.status);
                this.props.login();
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                // this.setState({submit_error: error.response.data.error});
                this.setState({loading: false});
                this.setState({visible_error : true});
            })
        })
    }

    handleSubmit = () => {
        const data = { "company_name":this.state.company_name, 
                        "email":this.state.email,
                        "password":this.state.password,
                        "phone_number":this.state.phone_number,
                        "website":this.state.website,
                        "about_me":this.state.about_me,
                        "profile_picture":this.state.profile_picture };

        for (var x in this.state.website) {
            var datum = this.state.website[x];
            switch(datum.label) {
                case "אתר החברה" :
                    data["company_url"] = datum.url;
                    break;
                case "פייסבוק" :
                    data["facebook_url"] = datum.url;
                    break;
                case "אינסטגרם" :
                    data["instagram_url"] = datum.url;
                    break;
                default:
                    break;
            }
        }   

        this.submitForm(data); // send the data to the server
    }

    handleNext = () => {
        this.setState({currentModal: 1 });
    }

    handlePrev = () => {
        this.setState({currentModal: 0 });
    }

    render() {
        const { loading, submit_error} = this.state;
        const submit_button = <button className="modalSubmitButton" onClick={this.handleSubmit}>
                                {!loading ? "אישור": null }
                                {loading ? (<Spinner style={{ width: '1.1rem', height: '1.1rem' }} color="light"/> ) : null}
                            </button>

        const showAlertSuccess = this.state.visible_success ? 
            <Alert style={{textAlign:"center"}} color="success">
            חשבון נוצר בהצלחה!</Alert> : null;

        const error_message = 
            submit_error === 'already_login' ? 'מישהו כבר מחובר לאתר' :
            submit_error === 'no_exists' ? 'לא קיים חשבון עם המייל הזה' :
            submit_error === 'wrong_password' ? 'סיסמא שגויה' : 
            submit_error === 'already_exists' ? 'חשבון עם מייל זה כבר קיים' :
            'אפוס, שגיאה כללית!' ;

        const showAlertError = this.state.visible_error ? 
            <Alert style={{textAlign:"center"}} color="danger">
                {error_message}</Alert> : null;        

        return (
            <div> {this.state.currentModal === 0 ?
            <Modal show={this.props.isOpen} onHide={this.props.toggle}
                aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-70w" className="registerJuniormodal">
                <div className="modalTitleTop">
                    <Modal.Title className="modalTitle" id="contained-modal-title-vcenter">
                    יצירת חשבון
                    </Modal.Title>
                    <div className="modalTitleUnderline"></div>
                </div> 
                <Modal.Body className="modalBody">
                <RegisterCompanyFormFirst state={this.state} handleChange={this.handleChange}
                    onChangeCompanyName={this.onChangeCompanyName}
                    onChangeUserName={this.onChangeUserName} onChangePassword={this.onChangePassword}
                    onChangeRePassword={this.onChangeRePassword}/>
                </Modal.Body>
                {this.state.formReadyFirst
                ? <button className="modalSubmitButton" onClick={this.handleNext}> הבא </button>
                : <button className="modalSubmitButton" disabled> הבא </button>}
            </Modal> 
            :
            this.state.currentModal === 1 ? 
            <Modal show={this.props.isOpen} onHide={this.props.toggle}
                aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-70w" className="registerJuniormodal">
                <div className="modalTitleTop">
                    <Modal.Title className="modalTitle" id="contained-modal-title-vcenter">
                    יצירת חשבון
                    </Modal.Title>
                    <div className="modalTitleUnderline"></div>
                </div>
                <Modal.Body className="modalBody">
                <RegisterCompanyFormSecond state={this.state} handleChange={this.handleChange} 
                        handleChangeField={this.handleChangeField} handleChangeWebsite={this.handleChangeWebsite} onChangeAbout={this.onChangeAbout}
                        handleRemoveClick={this.handleRemoveClick} handleAddClick={this.handleAddClick} handleChangePicture={this.handleChangePicture}/>
                </Modal.Body>

                <button className="modalSubmitButtonPrev" onClick={this.handlePrev}> הקודם </button>
                {this.state.formReadySecond 
                ? <button className="modalSubmitButton" onClick={this.handleSubmit}>
                        {!loading ? "אישור": null }
                        {loading ? (<Spinner style={{ width: '1.1rem', height: '1.1rem' }} color="light"/> ) : null}
                    </button>
                :  <button className="modalSubmitButton" disabled> אישור </button>}   
                {showAlertSuccess}
                {showAlertError}
            </Modal> : null }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userAuth: state
    };
}

const mapAction = {
    login: authActions.login
}

const withRouterComponent = withRouter(RegisterCompanyModalComponent);

export default connect(mapStateToProps, mapAction)(withRouterComponent);