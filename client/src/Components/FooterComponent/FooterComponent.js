import React , {Component} from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import classes from './FooterComponent.css';


class FooterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
    }

    render() { 
      const bgPink = {backgroundColor: '#D31172' };

      return (
        <MDBFooter style={bgPink} className="footer font-small pt-4 mt-4 text-center footer-copyright">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} Copyright:  <a href="https://projects-21.herokuapp.com/"> projects-21.com </a>
            </MDBContainer>
      </MDBFooter>)
    }
}

export default FooterComponent;