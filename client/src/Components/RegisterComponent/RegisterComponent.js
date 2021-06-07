import React, {Component} from 'react';
import {MDBCol, MDBRow} from 'mdbreact';

import classes from './RegisterComponent.module.css';
import RegisterCompanyModalComponent from './RegisterCompanyModalComponent';
import RegisterJuniorModalComponent from './RegisterJuniorModalComponent';
import leftImage from './images/register.png';

class RegisterComponent extends Component {
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
                            <h1 dir="rtl">הרשמה</h1>
                            <div className={classes.AllItemsHeaderUnderline}></div>
                        </div> 
                        <img src={leftImage} className={classes.RegisterLeftImage} alt=""/> 
                        <p className={classes.AboutPar} dir="rtl">
                           אם עוד לא נרשמת לאתר תלחץ על הכפתור שמתאים לך ותמצא שותפים חדשים לפרויקט!<br></br> <br></br> 
                           רוצה לקחת חלק בפרויקט? הירשם כג'וניור!<br></br>
                           מחפש בעלי מקצוע לעזרה? הירשם כעמותה!
                        </p>  
                    </div> 
                    <div className={classes.LandingTopButtons}>
                        <MDBRow>
                            <MDBCol>
                                <button className={classes.SignUpButton} type="button" onClick={this.toggleCompanyForm}>
                                    הירשם כעמותה    
                                </button>
                            </MDBCol>
                            <MDBCol>
                                <button className={classes.SignUpButton} type="button" onClick={this.toggleJuniorForm}>
                                הירשם כג'וניור
                                </button>
                            </MDBCol>
                        </MDBRow>
                    </div> 
                    <RegisterCompanyModalComponent className="Modal"
                        isOpen={this.state.companyModal} 
                        toggle={this.toggleCompanyForm}
                    />
                    <RegisterJuniorModalComponent className="Modal"
                        isOpen={this.state.juniorModal} 
                        toggle={this.toggleJuniorForm}
                    />
                </div>
            </div>
        )
    }
}

export default RegisterComponent;