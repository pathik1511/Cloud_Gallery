// Author : Pathik Kumar Patel

import { withRouter } from "react-router";
import {Navbar, Nav, Button, ButtonToolbar} from 'react-bootstrap';
import Logo from '../../logo.png';
import "../css/Header.css";

const Header = (props) => {
    const loginHandler = (event) => {
        props.history.push({
          pathname: "/"
        });
      }
    
        const signUpHandler = (event) => {
          props.history.push({
            pathname: "/signup"
          });
      }

        return (
        <Navbar className = "color_nav" expand="lg">
          <Navbar.Brand onClick = {() => {
            props.history.push("/home");
            }}>
              <img
              alt="Logo"
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"/>
              {' '}MyCloud Gallery
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mr-auto my-2 my-lg-0" 
            style={{ maxHeight: '100px' }}
            navbarScroll>
            </Nav>
          </Navbar.Collapse>
          <ButtonToolbar>
            <Button variant="primary" onClick={signUpHandler}>Sign Up</Button>{' '}
            <Button className = "btn" variant="outline-dark" onClick={loginHandler}>Login</Button>{' '}          </ButtonToolbar>
          </Navbar>
        );
}

export default withRouter(Header);