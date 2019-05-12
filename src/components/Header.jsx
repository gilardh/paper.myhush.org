import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
//import Nav from 'react-bootstrap/Nav'
//import NavItem from 'react-bootstrap/NavItem'

import logo from "../images/hush_logo_white.svg";

export default class Header extends React.Component {
    render() {
        return (
            <Navbar id="header" className="zenHeader" bg="dark" variant="dark">
            <div className="container">
                <Navbar.Brand href="#home">
                <img alt="HUSH" src={logo} width="30" height="30" className="d-inline-block align-top"/>
                {' HUSH Paper Wallet'}
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>Source code : <a href="https://github.com/MyHush/paper.myhush.org">Github</a></Navbar.Text>
                </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}