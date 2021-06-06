import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { connect } from 'react-redux';
import { authActions } from '../../actions';
import classes from './LogoutComponent.module.css';

const LogoutComponent = (props) => {
    const [open, setOpen] = useState(false);
    const user = localStorage.getItem('currentUserType');
    console.log(user);
    console.log(props);

    useEffect(() => {
        const url = user === 'junior' ? '/api/auth/junior_logout' : '/api/auth/company_logout';

        axios.post(url)
        .then(response => {
            console.log("respone", response);
            console.log("respone data", response.data);

            setOpen(true);

            setTimeout(() => {
                console.log("pushing to history");
                props.logout();
                props.history.push('/');
            }, 1500);
        })
        .catch(error => {
            console.log("response error " , error.response.data);
        })
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        <div className={classes.Logout}>
            <CircularProgress/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant='filled' onClose={handleClose} severety='success'>
                    התנתקת בהצלחה!
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userAuth: state
    };
}

const mapAction = {
    logout: authActions.logout
}

const withRouterComponent = withRouter(LogoutComponent);

export default connect(mapStateToProps, mapAction)(withRouterComponent);