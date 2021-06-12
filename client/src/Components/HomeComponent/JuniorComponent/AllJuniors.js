import React, {Component} from 'react';
import axios from 'axios';
import JuniorsComponent from './JuniorsComponent';
import classes from  '../AllItems.module.css';
import leftImage from './images/Designer_girl.png';
import { MDBRow } from 'mdbreact';

class AllJuniors extends Component {
    constructor(props) {    
        super(props)
        this.state = {
            allJuniorsArray: [],
            juniorsFieldFilter: [],
            currJuniorsArray: [],
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
        }
    }

    componentDidMount() {
        axios.get('/api/home/juniors')
            .then(response => this.setState({ allJuniorsArray : response.data,
                                              currJuniorsArray: response.data}))
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


    addToFilterArray(selected, activeNum) {
        let index = this.state.juniorsFieldFilter.indexOf(selected);
        let newJuniorsFieldFilter = this.state.juniorsFieldFilter;
        let newcurrJuniorsArray;

        if(index !== -1) // remove field from filter 
            newJuniorsFieldFilter.splice(index, 1);
        else // add field from filter 
            newJuniorsFieldFilter.push(selected);
        
        this.toggle(activeNum);

        if( newJuniorsFieldFilter.length === 0 ) // no more filter
            newcurrJuniorsArray = this.state.allJuniorsArray;
        else {
            newcurrJuniorsArray = this.state.allJuniorsArray.filter(junior =>
                junior.field.some(r => 
                    newJuniorsFieldFilter.some(f => r === f)));
        }

        this.setState({juniorsFieldFilter:newJuniorsFieldFilter,
                       currJuniorsArray:newcurrJuniorsArray});
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
        const style9 = this.state.isActive9 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style10 = this.state.isActive10 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style11 = this.state.isActive11 ? {background: "#D31172"} : {background: "#FFFDFA"};
        const style12 = this.state.isActive12 ? {background: "#D31172"} : {background: "#FFFDFA"};


        const filter_buttons =         
        <div className={classes.AllItemsFilterButtons}>
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
            <div className={classes.AllItemsTop}>
                <div className={classes.AllItemsHeaderRight}>
                    <h1 dir="rtl">הג'וניורים שלנו</h1>
                    <div className={classes.AllItemsHeaderUnderline}></div>
                </div> 
                <img src={leftImage} className={classes.AllItemsLeftImage} alt=""/> 
                <div className={classes.AllItemsFilter}>
                    <h3 className={classes.AllItemsFilterHeader}>בחר תחומי עיסוק</h3>
                    {filter_buttons}              
                </div>
            </div>
            <div className={classes.AllItemsBottom}>
                <JuniorsComponent juniors = {this.state.currJuniorsArray}/>
            </div>
        </div>
        )
    }
}
export default AllJuniors;