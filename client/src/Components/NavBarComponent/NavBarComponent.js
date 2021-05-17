import React, {Component , useContext } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import './NavBarComponent.css';
import { UserContext } from '../../UserContext';
import logo from './logo.png';
import { BrowserRouter as Router } from 'react-router-dom';

class NavBarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.onClick = this.onClick.bind(this);
    }
  
    onClick() {
      this.setState({
          collapse: !this.state.collapse,
        });
    }

    render() {
        // const user = useContext(UserContext);
        const noUser = <MDBNavbarNav left>
                            <MDBNavItem> <MDBNavLink className="nav-link-signIn" to="/register">הירשם</MDBNavLink> </MDBNavItem>
                            <MDBNavItem> <MDBNavLink className="nav-link-signUp" to="/login">התחבר</MDBNavLink> </MDBNavItem>
                        </MDBNavbarNav>;
        const userLoggedIn = <MDBNavbarNav left>
                                <MDBNavItem  className="NavBarMenuItemLeft"> <MDBNavLink to="/logout">התנתק</MDBNavLink> </MDBNavItem>
                             </MDBNavbarNav>;

        const bgBlue = {backgroundColor: '#29325D'};
        
    return (
          <header>
            <MDBNavbar style={bgBlue} expand="md" scrolling fixed="top">
              <MDBNavbarBrand>
                    <img className="NavBarLogo" src={logo} alt=""/>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={ this.onClick } />
              <MDBCollapse isOpen = { this.state.collapse } navbar>
                <MDBNavbarNav right>
                    <MDBNavItem style={{ width: '45' }}> <MDBNavLink to="/">דף הבית</MDBNavLink> </MDBNavItem>
                    <MDBNavItem> <MDBNavLink to="/home/projects">פרוייקטים</MDBNavLink> </MDBNavItem>
                    <MDBNavItem> <MDBNavLink to="/home/juniors">מתמחים</MDBNavLink> </MDBNavItem>
                    <MDBNavItem> <MDBNavLink to="/home/about">עלינו</MDBNavLink> </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav left>
                {/* {user.mail !== '' ? userLoggedIn : noUserLoggedIn} */}
                {noUser}
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>)
    }
}

export default NavBarComponent;