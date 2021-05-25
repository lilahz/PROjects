import React, {Component} from 'react';
import axios from 'axios';

import ProjectsComponent from './ProjectsComponent';
import FilterComponent from '../FilterComponent';
import {field_array} from '../data';
import {status_array} from '../data';
import leftImage from './images/Projections-pana.png';
import classes from  '../AllItems.module.css';
import { MDBCol } from 'mdbreact';


class AllProjects extends Component {
    constructor(props) {    
        super(props)
        this.state = {
            allProjectsArray: [],
            currProjectsArray: localStorage.getItem('currProjectsArray')?JSON.parse(localStorage.getItem('currProjectsArray')):null,
            projectsStatusFilter: localStorage.getItem('projectsStatusFilter')?JSON.parse(localStorage.getItem('projectsStatusFilter')):null,
            projectsFieldFilter: localStorage.getItem('projectsFieldFilter')?JSON.parse(localStorage.getItem('projectsFieldFilter')):null
        }
    }

    componentDidMount() {
        axios.get("/api/home/projects")
            .then(response => this.setState({allProjectsArray: response.data}))
    }


    projectFilterStatusOnChange = selected => {
        let newProjectsStatusFilter = [];
        let newcurrProjectsArray = [];
        if(selected === null || selected.length === 0) {
            newcurrProjectsArray = this.state.allProjectsArray ; 
            this.setState({projectsFieldFilter: null})
        }
        else {
            let valuesArrObj = selected.reduce((acc, current) => acc.concat(current.value), []);
            let filterArrayByStatus = [];
            if(this.state.projectsFieldFilter === null || this.state.projectsFieldFilter.length === 0) {
                filterArrayByStatus = this.state.allProjectsArray.filter(project => valuesArrObj.includes(project.status)); }
            else {
                filterArrayByStatus = this.state.currProjectsArray.filter(project => valuesArrObj.includes(project.status)); }
            
            newProjectsStatusFilter = selected ;
            newcurrProjectsArray = filterArrayByStatus;
        }
        this.setState({projectsStatusFilter:newProjectsStatusFilter,
                       currProjectsArray:newcurrProjectsArray},
        () => {
            localStorage.setItem('projectsStatusFilter', JSON.stringify(newProjectsStatusFilter));
            localStorage.setItem('currProjectsArray', JSON.stringify(newcurrProjectsArray));
        })
    }

    projectFilterFieldOnChange = selected => {
        let newProjectsFieldFilter = [];
        let newcurrProjectsArray = [];
        if(selected === null || selected.length === 0) {
            newcurrProjectsArray = this.state.allProjectsArray ; 
            this.setState({projectsStatusFilter: null})
        }
        else {
            let valuesArrObj = selected.reduce((acc, current) => acc.concat(current.value), []);
            let filterArrayByField = [];
            if(this.state.projectsStatusFilter === null || this.state.projectsStatusFilter.length === 0) {
                filterArrayByField = this.state.allProjectsArray.filter(project => project.field.some(r => valuesArrObj.includes(r))); }
            else {
                filterArrayByField = this.state.currProjectsArray.filter(project => project.field.some(r => valuesArrObj.includes(r))); }
            newProjectsFieldFilter = selected ;
            newcurrProjectsArray = filterArrayByField;
        }
        this.setState({projectsFieldFilter:newProjectsFieldFilter,
                        currProjectsArray:newcurrProjectsArray},
        () => {
            localStorage.setItem('projectsFieldFilter', JSON.stringify(newProjectsFieldFilter));
            localStorage.setItem('currProjectsArray', JSON.stringify(newcurrProjectsArray));
        })
    }

    render() {
        return (
            <div>
                <div className={classes.AllItemsTop}>
                    <div className={classes.AllItemsHeaderRight}>
                        <h1 dir="rtl">הפרויקטים שלנו</h1>
                        <div className={classes.AllItemsHeaderUnderline}></div>
                    </div> 
                    <img src={leftImage} className={classes.AllItemsLeftImage} alt=""/>               
                    <div className={classes.Filters}>
                        <MDBCol>
                            <FilterComponent
                                place_holder = "סנן לפי תחום"
                                filter_array = {field_array}
                                handle_on_change = {this.projectFilterFieldOnChange}
                                filter_value = {this.state.projectsFieldFilter}
                            />
                            <FilterComponent
                                place_holder = "סנן לפי סטטוס"
                                filter_array = {status_array}
                                handle_on_change = {this.projectFilterStatusOnChange}
                                filter_value = {this.state.projectsStatusFilter} 
                            />
                        </MDBCol>
                    </div>
                </div>
                <ProjectsComponent projects = {this.state.currProjectsArray}/>
            </div>
        )
    }
}
export default AllProjects;