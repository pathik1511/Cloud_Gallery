// Author : Pathik Kumar Patel
// Description : Header of website after user logs in

import React, { Component } from "react";
import Logo from "../../logo.png";
import "../css/Header.css";
import { withRouter } from "react-router";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import PrivateShareLink from "../../components/PrivateShareLink";
import ShareLink from "../../components/ShareLink";
import Uploader from "../../components/Uploader";

const UserHeader = (props) => {
  return (
    <Navbar className="color_nav" expand="lg">
      <Navbar.Brand
        onClick={() => {
          props.history.push("/home");
        }}
      >
        <img
          alt="Logo"
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        MyCloud Gallery
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <NavDropdown title="Photos" id="navbarScrollingDropdown">
            <NavDropdown.Item
              onClick={() => {
                props.history.push("Delivery");
              }}
            >
              Library
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                props.history.push("SignUp");
              }}
            >
              Shared
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link onClick={() => {
                props.history.push("/");
                localStorage.removeItem("email");
              }} >Log out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav>
        <Navbar.Collapse className="justify-content-end">
          <Uploader />
          <ShareLink />
          <PrivateShareLink />
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  );
};

export default withRouter(UserHeader);
