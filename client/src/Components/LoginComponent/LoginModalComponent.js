import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import { Button, Spinner, Alert } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import './LoginModal.css';

import { UserContext } from '../../UserContext';
import { authActions } from '../../actions';

class LoginModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        email: '',
        password: '',
        userNameReady: false,
        passwordReady: false,
        formReady: false,
        submit_error: '',
        visible_success: false,
        visible_error: false,
        loading: false
    });

    static contextType = UserContext;

    onShowAlertSuccess = (toggle) =>{
        this.setState({visible_success:true},()=>{
          window.setTimeout(()=>{
            // toggle();
            this.setState({visible_success:false})
          },3000)
        });
    }

    onShowAlertFail = (toggle) =>{
        this.setState({visible_error:true},()=>{
          window.setTimeout(()=>{
            // toggle();
            this.setState({visible_error:false})
          },3000)
        });
    }

    handleChangeUserName = event => {
        let userNameReady = event.target.value ? true : false;
        let formReady = this.state.passwordReady && userNameReady;
        this.setState({
          [event.target.id]: event.target.value,
          userNameReady: userNameReady, 
          formReady: formReady
        });
    }

    handleChangePassword = event => {
        let passwordReady = event.target.value ? true : false;
        let formReady = this.state.userNameReady && passwordReady;
        this.setState({
          [event.target.id]: event.target.value,
          passwordReady: passwordReady, 
          formReady: formReady
        });
    }

    submitForm = (data) => {
        this.setState({loading:true}, () => {
            const url = this.props.url;
            const context = this.context;
            axios.post(url, data)
            .then(response => {
                this.setState({loading: false});
                this.setState({visible_error : false});
                context.setMail(data.email);
                context.setType(this.props.type);
                this.props.login();
                this.props.history.push('/');
                this.onShowAlertSuccess();
            })
            .catch(error => {
                this.setState({submit_error: error.response.data.error});
                this.setState({loading: false});
                this.setState({visible_error : true});
                this.onShowAlertFail();
            })
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {"email":this.state.email,
                      "password":this.state.password };

        this.submitForm(data); // send the data to the server
    }


    render() {
        const { loading, submit_error } = this.state;

        const showAlertSuccess = <Alert style={{textAlign:"center"}} 
                                    color="success" isOpen={this.state.visible_success}>
                                    Logged in Successfully!
                                </Alert>;

        const error_message = 
            submit_error === 'already_login' ? 'מישהו כבר מחובר לאתר' :
            submit_error === 'no_exists' ? 'לא קיים חשבון עם המייל הזה' :
            submit_error === 'wrong_password' ? 'סיסמא שגויה' : 
            'אפוס, שגיאה כללית!' ;

        const showAlertError = <Alert style={{textAlign:"center"}} 
                                    color="danger" isOpen={this.state.visible_error}>
                                    {error_message}
                                </Alert>;        

        return (
            <Modal show={this.props.isOpen} onHide={this.props.toggle}
                aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-70w" className="loginmodal">
                <div className="modalTitleTop">
                    <Modal.Title className="modalTitle" id="contained-modal-title-vcenter">
                    התחבר
                    </Modal.Title>
                    <div className="modalTitleUnderline"></div>
                </div> 
                <Modal.Body className="modalBody">
                    <LoginForm state={this.state} handleChangeUserName={this.handleChangeUserName} handleChangePassword={this.handleChangePassword}/>
                </Modal.Body>
                {this.state.formReady  
                    ? <button className="modalSubmitButton" onClick={this.handleSubmit}>
                        {!loading ? "אישור": null }
                        {loading ? (<Spinner style={{ width: '1.1rem', height: '1.1rem' }} color="light"/> ) : null}
                      </button>
                    : <button className="modalSubmitButton" disabled>צור</button> }
                 {showAlertSuccess}
                 {showAlertError}
             </Modal>
        );
    }
}

const withRouterComponent = withRouter(LoginModalComponent);

const mapStateToProps = state => {
    return {
        userAuth: state
    };
}

const mapAction = {
    login: authActions.login
}

export default connect(mapStateToProps, mapAction)(withRouterComponent);