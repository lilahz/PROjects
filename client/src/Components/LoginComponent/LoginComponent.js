import React, {Component} from 'react';
import {MDBCol, MDBRow} from 'mdbreact';
import classes from './LoginComponent.module.css';
import LoginModalComponent from './LoginModalComponent';
import leftImage from './images/login.png';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyModal: false,
            juniorModal: false
        }
    };

    toggleCompanyForm = () => {
        this.setState({companyModal: !this.state.companyModal});
    }

    toggleJuniorForm = () => {
        this.setState({juniorModal: !this.state.juniorModal});
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <div className={classes.AllItemsHeaderRight}>
                            <h1 dir="rtl">כניסה</h1>
                            <div className={classes.AllItemsHeaderUnderline}></div>
                        </div> 
                        <img src={leftImage} className={classes.LoginLeftImage} alt=""/> 
                    <p className={classes.AboutPar} dir="rtl">
                           אם כבר נירשמת כל מה שאת/ה צריך/ה זה ללחוץ על הכפתור שמתאים עבורך ולמצוא פרטנרים לפרויקט חדש!<br></br> 
                        </p>  
                    </div>    
                    <div className={classes.LandingTopButtons}>
                        <MDBRow>
                            <MDBCol>
                            <button className={classes.SignUpButton} type="button" onClick={this.toggleCompanyForm}>
                                היכנס/י כעמותה    
                            </button>
                            </MDBCol>
                            <MDBCol>
                            <button className={classes.SignUpButton} type="button" onClick={this.toggleJuniorForm}>
                                היכנס/י  כג'וניור
                            </button>
                            </MDBCol>
                        </MDBRow>
                    </div> 
                    <LoginModalComponent className="Modal"
                        isOpen={this.state.companyModal} 
                        toggle={this.toggleCompanyForm}
                        url="/api/auth/company_login"
                        type="company"
                    />
                    <LoginModalComponent className="Modal"
                        isOpen={this.state.juniorModal} 
                        toggle={this.toggleJuniorForm}
                        url="/api/auth/junior_login"
                        type="junior"
                    />
                </div>
            </div>
        )
    }
}

export default LoginComponent;