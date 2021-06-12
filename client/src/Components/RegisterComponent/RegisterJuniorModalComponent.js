import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import {Spinner, Alert} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import {RegisterJuniorFormFirst, RegisterJuniorFormSecond} from './RegisterJuniorForm';
import { authActions } from '../../actions';
import './RegisterJuniorModal.css';
import { MDBRow } from 'mdbreact';


class RegisterJuniorModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        full_name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_number: '',
        field: [],
        website: [{label: 'אתר אישי', url: ''}],
        about_me: '',
        profile_picture: '',
        fullNameReady: false,
        userNameReady: false,
        passwordReady: false,
        repasswordReady: false,
        aboutReady: false,
        fieldsReady: false,
        formReadyFirst: false,
        formReadySecond: false,
        submit_error: '',
        visible_success: false,
        visible_error: false,
        loading: false,
        currentModal: 0,
        isActive1 : false,
        isActive2 : false,
        isActive3 : false,
        isActive4 : false,
        isActive5 : false,
        isActive6 : false,
        isActive7 : false,
        isActive8 : false,
        isActive9 : false,
        isActive10 : false,
        isActive11 : false,
        isActive12 : false
    });

    onShowAlert = () =>{
        this.setState({visible_success:true},()=>{
          window.setTimeout(()=>{
            // toggle();
            this.setState({visible_success:false})
          },3000)
        });
    }

    toggle = (activeNum) => {
        activeNum === 1 ? this.setState({isActive1: !this.state.isActive1}) :
        activeNum === 2 ? this.setState({isActive2: !this.state.isActive2}) :
        activeNum === 3 ? this.setState({isActive3: !this.state.isActive3}) :
        activeNum === 4 ? this.setState({isActive4: !this.state.isActive4}) :
        activeNum === 5 ? this.setState({isActive5: !this.state.isActive5}) :
        activeNum === 6 ? this.setState({isActive6: !this.state.isActive6}) :
        activeNum === 7 ? this.setState({isActive7: !this.state.isActive7}) :
        activeNum === 8 ? this.setState({isActive8: !this.state.isActive8}) :
        activeNum === 9 ? this.setState({isActive9: !this.state.isActive9}) :
        activeNum === 10 ? this.setState({isActive10: !this.state.isActive10}) :
        activeNum === 11 ? this.setState({isActive11: !this.state.isActive11}) :
        this.setState({isActive12: !this.state.isActive12});
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
            label: 'אתר אישי',
            url: ''
        });
        this.setState({website : values});
    };

    onChangeFullName = event => {
        let fullNameReady = event.target.value ? true : false;
        let formTillNow = this.state.userNameReady && this.state.passwordReady && this.state.repasswordReady;

        let formReadyFirst = formTillNow && fullNameReady;

        this.setState({
          [event.target.id]: event.target.value,
          fullNameReady: fullNameReady, 
          formReadyFirst: formReadyFirst
        });
    }

    onChangeUserName = event => {
        let userNameReady = event.target.value ? true : false;
        let formTillNow = this.state.fullNameReady && this.state.passwordReady && this.state.repasswordReady;

        let formReadyFirst = formTillNow && userNameReady;

        this.setState({
          [event.target.id]: event.target.value,
          userNameReady: userNameReady, 
          formReadyFirst: formReadyFirst
        });
    }

    onChangePassword = event => {
        let passwordReady = event.target.value ? true : false;
        let formTillNow = this.state.fullNameReady && this.state.userNameReady && this.state.repasswordReady;

        let formReadyFirst = formTillNow && passwordReady;

        this.setState({
          [event.target.id]: event.target.value,
          passwordReady: passwordReady, 
          formReadyFirst: formReadyFirst
        });
    }
    
    onChangeRePassword = event => {
        let repasswordReady = event.target.value ? true : false;
        let formTillNow = this.state.fullNameReady && this.state.userNameReady && this.state.passwordReady;
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
        let formReadySecond = this.state.fieldsReady && aboutReady;
        this.setState({
          [event.target.id]: event.target.value,
          aboutReady: aboutReady, 
          formReadySecond: formReadySecond
        });
    }

    addToFilterArray(selected, activeNum) {
        let fieldsReady;
        let index = this.state.field.indexOf(selected);
        let newFieldArray = this.state.field;

        if(index !== -1)  // remove field
            newFieldArray.splice(index, 1);
        else // add field
            newFieldArray.push(selected);

        this.toggle(activeNum);

        if (newFieldArray === [] || newFieldArray === null || newFieldArray.length === 0)
            fieldsReady = false;
        else    
            fieldsReady = true;

        let formReadySecond = this.state.aboutReady && fieldsReady;

        this.setState({field : newFieldArray,
                        fieldsReady: fieldsReady, 
                        formReadySecond: formReadySecond});
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
            const url = '/api/auth/junior_register';
            axios.post(url, data)
            .then(response => {
                this.setState({loading: false});
                this.setState({visible_success : true});
                console.log("respone data : " + response.data);
                console.log("response status : " + response.status);
                this.props.login();
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({submit_error: error.response.data.error});
                this.setState({loading: false});
                this.setState({visible_error : true});
                console.log("response status : " , error.response.status); 
                console.log("response error : " , error.response.data.error);
            })
        })
    }

    handleSubmit = () => {
        const data = { "full_name":this.state.full_name, 
                        "email":this.state.email,
                        "password":this.state.password,
                        "phone_number":this.state.phone_number,
                        "field":this.state.field,
                        "about_me":this.state.about_me,
                        "profile_picture":this.state.profile_picture };

        for (var x in this.state.website) {
            var datum = this.state.website[x];
            switch(datum.label) {
                case "אתר אישי" :
                    data["personal_url"] = datum.url;
                    break;
                case "פייסבוק" :
                    data["facebook_url"] = datum.url;
                    break;
                case "אינסטגרם" :
                    data["instagram_url"] = datum.url;
                    break;
                case "לינקדין" :
                    data["linkedIn_url"] = datum.url;
                    break; 
                case "גיטהאב" :
                    data["gitHub_url"] = datum.url;
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

        const style1 = this.state.isActive1 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style2 = this.state.isActive2 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style3 = this.state.isActive3 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style4 = this.state.isActive4 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style5 = this.state.isActive5 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style6 = this.state.isActive6 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style7 = this.state.isActive7 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style8 = this.state.isActive8 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style9 = this.state.isActive9 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style10 = this.state.isActive10 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style11 = this.state.isActive11 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style12 = this.state.isActive12 ? {background: "#D31172"} : {background: "#FFFDFA"};

        const filter_buttons =         
            <div className="FilterButtons">
                <MDBRow>
                    <button type="button" style={style1} onClick={() => this.addToFilterArray("appdev", 1)}>פיתוח אפליקציות</button>
                    <button type="button" style={style2} onClick={() => this.addToFilterArray("webdev", 2)}>פיתוח אתרים</button>
                    <button type="button" style={style3} onClick={() => this.addToFilterArray("marketing", 3)}>שיווק</button>
                    <button type="button" style={style4} onClick={() => this.addToFilterArray("logodesign", 4)}>עיצוב לוגו</button>
                    <button type="button" style={style5} onClick={() => this.addToFilterArray("uiux", 5)}>UI / UX</button>
                    <button type="button" style={style6} onClick={() => this.addToFilterArray("legal", 6)}>ייעוץ משפטי</button>
                    <button type="button" style={style7} onClick={() => this.addToFilterArray("finance", 7)}>ייעוץ כלכלי</button>
                    <button type="button" style={style8} onClick={() => this.addToFilterArray("sales", 8)}>מכירות</button>
                    <button type="button" style={style9} onClick={() => this.addToFilterArray("projectmanager", 9)}>ניהול פרוייקט</button>
                    <button type="button" style={style10} onClick={() => this.addToFilterArray("media", 10)}>מדיה</button>
                    <button type="button" style={style11} onClick={() => this.addToFilterArray("film", 11)}>צילום</button>
                    <button type="button" style={style12} onClick={() => this.addToFilterArray("acting", 12)}>משחק</button>
                </MDBRow>
            </div>;

        const error_message = 
            submit_error === 'already_login' ? 'מישהו כבר מחובר לאתר' :
            submit_error === 'no_exists' ? 'לא קיים חשבון עם המייל הזה' :
            submit_error === 'wrong_password' ? 'סיסמא שגויה' : 
            submit_error === 'already_exists' ? 'חשבון עם מייל זה כבר קיים' :
            'אפוס, שגיאה כללית!' ;

        const showAlertSuccess = this.state.visible_success ? 
            <Alert style={{textAlign:"center"}} color="success">
                חשבון נוצר בהצלחה!</Alert> : null;

        const showAlertError = this.state.visible_error ? 
            <Alert style={{textAlign:"center"}} color="danger">
                {error_message}</Alert> : null;    
                
        return (
            <div> {this.state.currentModal === 0 ? 
            <Modal show={this.props.isOpen} onHide={this.props.toggle}
                aria-labelledby="contained-modal-title-vcenter"
                centered dialogClassName="modal-70w" className="registerJuniormodal">
                <div className="modalTitleTop">
                    <Modal.Title className="modalTitle" id="contained-modal-title-vcenter">
                    יצירת חשבון
                    </Modal.Title>
                    <div className="modalTitleUnderline"></div>
                </div> 
                <Modal.Body className="modalBody"> 
                    <RegisterJuniorFormFirst state={this.state}
                         onChange={this.onChange} onChangeFullName={this.onChangeFullName}
                         onChangeUserName={this.onChangeUserName} onChangePassword={this.onChangePassword}
                         onChangeRePassword={this.onChangeRePassword} />
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
                    <RegisterJuniorFormSecond state={this.state} 
                        handleChangeWebsite={this.handleChangeWebsite} onChangeAbout={this.onChangeAbout}
                        filterButtons={filter_buttons}
                        handleRemoveClick={this.handleRemoveClick} handleAddClick={this.handleAddClick} handleChangePicture={this.handleChangePicture}/>
                </Modal.Body>

                <button className="modalSubmitButtonPrev" onClick={this.handlePrev}> הקודם </button>
                {this.state.formReadySecond 
                ? <button className="modalSubmitButton" onClick={this.handleSubmit}>
                        {!loading ? "אישור": null }
                        {loading ? (<Spinner style={{ width: '1.1rem', height: '1.1rem' }} color="light"/> ) : null}
                    </button> 
                : <button className="modalSubmitButton" disabled> אישור </button>}
                              
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

const withRouterComponent = withRouter(RegisterJuniorModalComponent);

export default connect(mapStateToProps, mapAction)(withRouterComponent);