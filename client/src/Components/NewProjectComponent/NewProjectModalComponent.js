import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import {Alert} from 'reactstrap';
import axios from 'axios';
import NewProjectForm from './NewProjectForm';
import { MDBRow} from 'mdbreact';
import './NewProjectModal.css';

import { UserContext } from '../../UserContext';


class NewProjectModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        company_id: localStorage.getItem('id'),
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
        isActive8 : false,
        isActive9 : false,
        isActive10 : false,
        isActive11 : false,
        isActive12 : false
    });

    static contextType = UserContext;

    onShowAlert = (toggle) =>{
        this.setState({visible:true},()=>{
          window.setTimeout(()=>{
            toggle();
            this.setState({visible:false})
          },2000)
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

    addToFilterArray(selected, activeNum) {
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



    render() {
        const context = this.context;

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

        return (
            <div>
            <Modal show={this.props.isOpen} onHide={this.props.toggle} key={this.props.key}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-70w"
                className="newProjectmodal">
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
                : <button className="modalSubmitButton" disabled>צור</button>}
                {showAlert}
            </Modal>
            </div>
        );
    }
}

export default NewProjectModalComponent;