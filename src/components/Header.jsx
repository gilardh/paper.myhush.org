import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'

import logoFull from "../logo_full.png";

export default class Header extends React.Component {
    render() {
        return (
            <Navbar id="header" className="zenHeader">
                <div className="container">
                        <Navbar.Brand>
                            <img src={logoFull} alt="logo"/>
                        </Navbar.Brand>
                    <Nav pullRight>
                        <NavItem href="https://myzenwallet.io/" className="headerLeftOption">WEB WALLET</NavItem>
                        <Navbar.Text>|</Navbar.Text>
                        <NavItem href="http://getzen.cash/" className="headerLeftOption">FAUCET</NavItem>
                        <Navbar.Text>|</Navbar.Text>
                        <NavItem href="https://support.horizen.global" className="headerLeftOption">SUPPORT</NavItem>
                    </Nav>
                </div>
            </Navbar>
        );
    }
}
