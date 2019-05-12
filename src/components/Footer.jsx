import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

//import website from "../website.png";
//import blogger from "../blogger.png";
//import forum from "../forum.png";
//import github from "../github.png";
//import facebook from "../facebook.png";
//import twitter from "../twitter.png";
//import telegram from "../telegram.png";
//import discord from "../discord.png";
//import bitcointalk from "../bitcointalk.png";
//import youtube from "../youtube.png";
//import reddit from "../reddit.png";

import logo from "../images/favicon.ico";

export default class Footer extends Component {
    render() {
        return (
            <Container fluid={true} id="footer">
                <br />
                <div >
                <Row className="justify-content-md-center">
                    <Col xs={6} md={3}>
                        <Image src={logo} fluid />
                    </Col>

                    <Col xs={6} md={3}>
                        <Image src={logo} fluid />
                    </Col>

                    </Row>
                </div>
                    
                <div class="text-center">
                <Row >
                    <Col md={12}>
                        <p className="footerCopyright">
                            Addresses and Keys are generated client-side.
                            This project is <a href="https://github.com/MyHush/paper.myhush.org">opensource</a> under MIT licence.
                        </p>
                        <p className="footerCopyright">
                            If you have any question or suggestion, find us on <a href="https://myhush.org/discord/">Discord</a>.
                        </p>
                    </Col>
                </Row>
                </div>
            </Container>
        );
    }
}