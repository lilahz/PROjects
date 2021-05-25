import React, {Component} from 'react';
import axios from 'axios';

import JuniorsComponent from './JuniorsComponent';
import FilterComponent from '../FilterComponent';
import classes from  '../AllItems.module.css';
import {field_array} from '../data';
import leftImage from './images/Designer_girl.png';

class AllJuniors extends Component {
    constructor(props) {    
        super(props)
        this.state = {
            background: "#FFF6EB",
            allJuniorsArray: [],
            items: localStorage.getItem('items')?JSON.parse(localStorage.getItem('items')):[],
            juniorFieldFilter: localStorage.getItem('juniorFieldFilter')?JSON.parse(localStorage.getItem('juniorFieldFilter')):[]
        }
    }

    componentDidMount() {
        axios.get('/api/home/juniors')
            .then(response => this.setState({ allJuniorsArray : response.data }))
    }

    juniorFilterFieldOnChange = selected => {
        let newjuniorFieldFilter = [];
        let newItems = [];
        if(selected === null || selected.length === 0) {
            newItems = this.state.allJuniorsArray ; 
        }
        else {
            let valuesArrObj = selected.reduce((acc, current) => acc.concat(current.value), []);
            let filterArrayByField = this.state.items.filter(junior => junior.field.some(r => valuesArrObj.includes(r)));
            newjuniorFieldFilter = selected ;
            newItems = filterArrayByField;
        }
        this.setState({juniorFieldFilter:newjuniorFieldFilter,
                        items:newItems},
        () => {
            localStorage.setItem('juniorFieldFilter', JSON.stringify(newjuniorFieldFilter));
            localStorage.setItem('items', JSON.stringify(newItems));
        })
    }

    render() { 
        return (
        <div>
            <div className={classes.AllItemsTop}>
                <div className={classes.AllItemsHeaderRight}>
                    <h1 dir="rtl">הג'וניורים שלנו</h1>
                    <div className={classes.AllItemsHeaderUnderline}></div>
                </div> 
                <img src={leftImage} className={classes.AllItemsLeftImage} alt=""/>               
                <div className={classes.Filters}>
                <FilterComponent
                    place_holder = "סנן לפי תחום"
                    filter_array = {field_array}
                    handle_on_change = {this.juniorFilterFieldOnChange}
                    filter_value = {this.state.juniorFieldFilter} />
                </div>
            </div>
            <JuniorsComponent juniors = {this.state.items}/>
        </div>
        )
    }
}
export default AllJuniors;