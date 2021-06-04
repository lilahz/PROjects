import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from 'reactstrap';
import axios from 'axios';
import NewProjectForm from './NewProjectForm';
import { MDBBtn, MDBIcon, MDBRow} from 'mdbreact';
import './NewProjectModal.css';

import { UserContext } from '../../UserContext';


class NewProjectModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        company_id: "1",
        field: [],
        status: "todo",
        description: "",
        descReady: false,
        fieldsReady: false,
        formReady: false,
        visible : false,
        isActive1 : false,
        isActive2 : false,
        isActive3 : false,
        isActive4 : false,
        isActive5 : false,
        isActive6 : false,
        isActive7 : false,
        isActive8 : false
    });

    static contextType = UserContext;

    onShowAlert = (toggle) =>{
        this.setState({visible:true},()=>{
          window.setTimeout(()=>{
            toggle();
            this.setState({visible:false})
          },3000)
        });
    }

    onChangeDesc = event => {
        let descReady = event.target.value ? true : false;
        let formReady = this.state.fieldsReady && descReady;
        this.setState({
          [event.target.id]: event.target.value,
          descReady: descReady, 
          formReady: formReady
        });
    }

    onChangefield(selected, activeNum) {
        let fieldsReady = true;
        let index = this.state.field.indexOf(selected);
        let newFieldArray = this.state.field;

        if(index !== -1)  // remove field
            newFieldArray.splice(index, 1);
        else // add field
            newFieldArray.push(selected);

        this.toggle(activeNum);

        if (newFieldArray === [] || newFieldArray === null || newFieldArray.length === 0)
            fieldsReady = false;

        let formReady = this.state.descReady && fieldsReady;

        this.setState({field : newFieldArray,
            fieldsReady: fieldsReady, 
            formReady: formReady});
        // console.log("field ready: " + this.state.fieldsReady);
    }

    submitForm = (data) => {
        const url = '/api/new_project';
        axios.post(url, data)
        .catch(error => console.error("Error:", error))
        .then(response => console.log("Success:", response));
    }

    handleSubmit = (toggle) => {
        const data = { "company_id":this.state.company_id, 
                        "field":this.state.field,
                        "status":this.state.status,
                        "description":this.state.description
                        };

        this.submitForm(data); // send the data to the server
        this.setState(this.getInitialState()); // if success, reset all fields
        this.onShowAlert(toggle);     
    }


    toggle = (activeNum) => {
        activeNum == 1 ? this.setState({isActive1: !this.state.isActive1}) :
        activeNum == 2 ? this.setState({isActive2: !this.state.isActive2}) :
        activeNum == 3 ? this.setState({isActive3: !this.state.isActive3}) :
        activeNum == 4 ? this.setState({isActive4: !this.state.isActive4}) :
        activeNum == 5 ? this.setState({isActive5: !this.state.isActive5}) :
        activeNum == 6 ? this.setState({isActive6: !this.state.isActive6}) :
        activeNum == 7 ? this.setState({isActive7: !this.state.isActive7}) :
        this.setState({isActive8: !this.state.isActive8});
    }


    render() {
        const context = this.context;
        const { errors } = this.state;
        const showAlert = this.state.visible ? 
                    <Alert style={{textAlign:"center"}} variant="success">
                        פרוייקט נוצר בהצלחה!</Alert> : null;

        const style1 = this.state.isActive1 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style2 = this.state.isActive2 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style3 = this.state.isActive3 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style4 = this.state.isActive4 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style5 = this.state.isActive5 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style6 = this.state.isActive6 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style7 = this.state.isActive7 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style8 = this.state.isActive8 ? {background: "#D31172"} : {background: "#FFFDFA"};

        const filter_buttons =         
            <div className="FilterButtons">
                <MDBRow>
                    <button type="button" style={style1} onClick={() => this.onChangefield("appdev", 1)}>פיתוח אפליקציות</button>
                    <button type="button" style={style2} onClick={() => this.onChangefield("webdev", 2)}>פיתוח אתרים</button>
                    <button type="button" style={style3} onClick={() => this.onChangefield("marketing", 3)}>שיווק</button>
                    <button type="button" style={style4} onClick={() => this.onChangefield("logodesign", 4)}>עיצוב לוגו</button>
                    <button type="button" style={style5} onClick={() => this.onChangefield("webdesign", 5)}>עיצוב אתרים</button>
                    <button type="button" style={style6} onClick={() => this.onChangefield("legal", 6)}>סיוע משפטי</button>
                    <button type="button" style={style7} onClick={() => this.onChangefield("legal", 7)}>סיוע כלכלי</button>
                    <button type="button" style={style8} onClick={() => this.onChangefield("sales", 8)}>מכירות</button>
                </MDBRow>
            </div>;
        return (
            <div>
            <Modal show={this.props.isOpen} onHide={this.props.toggle} key={this.props.key}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-70w"
                className="modal">
                <div className="modalTitleTop">
                    <Modal.Title className="modalTitle" id="contained-modal-title-vcenter">
                    יצירת פרוייקט חדש{this.props.modalTitle}
                    </Modal.Title>
                    <div className="modalTitleUnderline"></div>
                </div> 
                <Modal.Body className="modalBody">
                    <NewProjectForm state={this.state}
                                    handleChange={this.onChangeDesc} 
                                    onChangefield={this.onChangefield}
                                    filterButtons={filter_buttons} />
                </Modal.Body>
                {this.state.formReady 
                ? <button className="modalSubmitButton"
                    onClick={() => this.handleSubmit(this.props.toggle)}>צור
                  </button>
                : <button className="modalSubmitButton" disabled
                    onClick={() => this.handleSubmit(this.props.toggle)}>צור
                  </button>}
                {showAlert}
            </Modal>
            </div>
        );
    }
}

export default NewProjectModalComponent;