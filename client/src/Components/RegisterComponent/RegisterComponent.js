import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

import classes from './RegisterComponent.module.css';
import RegisterCompanyModalComponent from './RegisterCompanyModalComponent';
import RegisterJuniorModalComponent from './RegisterJuniorModalComponent';

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
                        {/* <img src={leftImage} className={classes.AboutLeftImage} alt=""/>  */}
                        <p className={classes.AboutPar} dir="rtl">
                           אם עוד לא נרשמת לאתר תלחץ על הכפתור שמתאים לך ותמצא שותפים חדשים לפרויקט!<br></br> 
                        </p>  
                    </div> 
                    <div className={classes.Buttons}>
                        <Button
                            className={classes.Button}
                            variant="outline-secondary"
                            style={{width: "130px"}}
                            onClick={this.toggleCompanyForm}
                            block>
                                עמותה
                        </Button>
                        <Button
                            className={classes.Button}
                            variant="outline-secondary"
                            style={{width: "130px"}}
                                onClick={this.toggleJuniorForm}
                            block>
                                ג'וניור
                        </Button>
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