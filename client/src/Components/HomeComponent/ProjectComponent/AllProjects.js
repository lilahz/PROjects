import React, {Component} from 'react';
import axios from 'axios';

import ProjectsComponent from './ProjectsComponent';
import FilterComponent from '../FilterComponent';
import {field_array} from '../data';
import {status_array} from '../data';
import leftImage from './images/Projections-pana.png';
import classes from  '../AllItems.module.css';
import { MDBRow } from 'mdbreact';


class AllProjects extends Component {
    constructor(props) {    
        super(props)
        this.state = {
            allProjectsArray: [],
            currProjectsArray: [], 
            projectsFieldFilter: [],
            isActive1 : false,
            isActive2 : false,
            isActive3 : false,
            isActive4 : false,
            isActive5 : false,
            isActive6 : false,
            isActive7 : false,
            isActive8 : false
        }
    }

    componentDidMount() {
        axios.get("/api/home/projects")
            .then(response => this.setState({allProjectsArray: response.data,
                                             currProjectsArray: response.data}))
    }

    // projectFilterStatusOnChange = selected => {
    //     let newProjectsStatusFilter = [];
    //     let newcurrProjectsArray = [];
    //     if(selected === null || selected.length === 0) {
    //         newcurrProjectsArray = this.state.allProjectsArray ; 
    //         this.setState({projectsFieldFilter: null})
    //     }
    //     else {
    //         let valuesArrObj = selected.reduce((acc, current) => acc.concat(current.value), []);
    //         let filterArrayByStatus = [];
    //         if(this.state.projectsFieldFilter === null || this.state.projectsFieldFilter.length === 0) {
    //             filterArrayByStatus = this.state.allProjectsArray.filter(project => valuesArrObj.includes(project.status)); }
    //         else {
    //             filterArrayByStatus = this.state.currProjectsArray.filter(project => valuesArrObj.includes(project.status)); }
            
    //         newProjectsStatusFilter = selected ;
    //         newcurrProjectsArray = filterArrayByStatus;
    //     }
    //     this.setState({projectsStatusFilter:newProjectsStatusFilter,
    //                    currProjectsArray:newcurrProjectsArray},
    //     () => {
    //         localStorage.setItem('projectsStatusFilter', JSON.stringify(newProjectsStatusFilter));
    //         localStorage.setItem('currProjectsArray', JSON.stringify(newcurrProjectsArray));
    //     })
    // }

    // projectFilterFieldOnChange = selected => {
    //     let newProjectsFieldFilter = [];
    //     let newcurrProjectsArray = [];
    //     if(selected === null || selected.length === 0) {
    //         newcurrProjectsArray = this.state.allProjectsArray ; 
    //         this.setState({projectsStatusFilter: null})
    //     }
    //     else {
    //         let valuesArrObj = selected.reduce((acc, current) => acc.concat(current.value), []);
    //         let filterArrayByField = [];
    //         if(this.state.projectsStatusFilter === null || this.state.projectsStatusFilter.length === 0) {
    //             filterArrayByField = this.state.allProjectsArray.filter(project => project.field.some(r => valuesArrObj.includes(r))); }
    //         else {
    //             filterArrayByField = this.state.currProjectsArray.filter(project => project.field.some(r => valuesArrObj.includes(r))); }
    //         newProjectsFieldFilter = selected ;
    //         newcurrProjectsArray = filterArrayByField;
    //     }
    //     this.setState({projectsFieldFilter:newProjectsFieldFilter,
    //                     currProjectsArray:newcurrProjectsArray},
    //     () => {
    //         localStorage.setItem('projectsFieldFilter', JSON.stringify(newProjectsFieldFilter));
    //         localStorage.setItem('currProjectsArray', JSON.stringify(newcurrProjectsArray));
    //     })
    // }

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

    addToFilterArray(selected, activeNum) {
        let index = this.state.projectsFieldFilter.indexOf(selected);
        let newProjectsFieldFilter = this.state.projectsFieldFilter;
        let newcurrProjectsArray;

        if(index !== -1)  // remove field from filter 
            newProjectsFieldFilter.splice(index, 1);
        else // add field from filter 
            newProjectsFieldFilter.push(selected);

        this.toggle(activeNum);

        if( newProjectsFieldFilter.length == 0 ) // no more filter
            newcurrProjectsArray = this.state.allProjectsArray;
        else {
            newcurrProjectsArray = this.state.allProjectsArray.filter(project =>
                project.field.some(r => 
                   newProjectsFieldFilter.some(f => r == f)));
        }

        this.setState({projectsFieldFilter:newProjectsFieldFilter,
                       currProjectsArray:newcurrProjectsArray});
    }

    render() {

        const style1 = this.state.isActive1 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style2 = this.state.isActive2 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style3 = this.state.isActive3 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style4 = this.state.isActive4 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style5 = this.state.isActive5 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style6 = this.state.isActive6 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style7 = this.state.isActive7 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style8 = this.state.isActive8 ? {background: "#D31172"} : {background: "#FFFDFA"};

        const filter_buttons =         
            <div className={classes.AllItemsFilterButtons}>
                <MDBRow>
                    <button type="button" style={style1} onClick={() => this.addToFilterArray("appdev", 1)}>פיתוח אפליקציות</button>
                    <button type="button" style={style2} onClick={() => this.addToFilterArray("webdev", 2)}>פיתוח אתרים</button>
                    <button type="button" style={style3} onClick={() => this.addToFilterArray("marketing", 3)}>שיווק</button>
                    <button type="button" style={style4} onClick={() => this.addToFilterArray("logodesign", 4)}>עיצוב לוגו</button>
                    <button type="button" style={style5} onClick={() => this.addToFilterArray("webdesign", 5)}>עיצוב אתרים</button>
                    <button type="button" style={style6} onClick={() => this.addToFilterArray("legal", 6)}>סיוע משפטי</button>
                    <button type="button" style={style7} onClick={() => this.addToFilterArray("legal", 7)}>סיוע כלכלי</button>
                    <button type="button" style={style8} onClick={() => this.addToFilterArray("sales", 8)}>מכירות</button>
                </MDBRow>
            </div>;

        return (
            <div>
                <div className={classes.AllItemsTop}>
                    <div className={classes.AllItemsHeaderRight}>
                        <h1 dir="rtl">הפרויקטים שלנו</h1>
                        <div className={classes.AllItemsHeaderUnderline}></div>
                    </div> 
                    <img src={leftImage} className={classes.AllItemsLeftImage} alt=""/>               
                    <div className={classes.AllItemsFilter}>
                        <h3 className={classes.AllItemsFilterHeader}>בחר תחום</h3>
                        {filter_buttons}
                    </div>
                </div>
                <div className={classes.AllItemsBottom}>
                    <ProjectsComponent projects = {this.state.currProjectsArray}/>
                </div>
            </div>
        )
    }
}
export default AllProjects;