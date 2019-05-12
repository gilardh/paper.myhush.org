import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, FormControl } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import { QRCode }  from 'react-qr-svg';
import address from '../components/lib/hushjs/address'
import zaddress from '../components/lib/hushjs/zaddress'

class Brain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'T',
            passphrase: '',
            priv: '',
            wif: '',
            addr: ''
        };
    }

    updateInputValue(e) {
        this.setState({
            passphrase: e.target.value
        });
    }

    vanity(word, it) {
        console.log("Vanity Gen");
        let priv, wif, c_wif, pub, c_pub, addr, c_addr;

        console.log("START---->");
        for(let i = 0 ; i < it ; i++) {
            if((i*100/it) % 10 === 0) console.log((i*100/it) + "%");

            priv      = address.mkPrivKey(this.props.entropy + i);

            pub    = address.privKeyToPubKey(priv);
            addr    = address.pubKeyToAddr(pub);

            c_pub    = address.privKeyToPubKey(priv, true);
            c_addr    = address.pubKeyToAddr(c_pub);

            if (addr.search("zn" + word) !== -1
            ||  c_addr.search("zn" + word) !== -1) {
                console.log("MATCH !");
                break;
            }
        }
        console.log("<------END");

        wif     = address.privKeyToWIF(priv);
        c_wif    = address.privKeyToWIF(priv, true);
        this.setState({
            priv: priv,
            wif: wif,
            c_wif: c_wif,
            pub: pub,
            c_pub: c_pub,
            addr: addr,
            c_addr: c_addr
        });
        console.log(this.state);
    }

    genTAddress() {
        if(!this.state.passphrase) return;

        const words = this.state.passphrase.split(' ');
        if(words[0] === "Vanity") {
            const it = parseInt(words[2], 10);
            if(Number.isInteger(it)) return this.vanity(words[1], it);
        }

        const priv      = address.mkPrivKey(this.state.passphrase);
        const privWIF   = address.privKeyToWIF(priv, true);
        const pubKey    = address.privKeyToPubKey(priv, true);
        const znAddr    = address.pubKeyToAddr(pubKey);

        this.setState({
            priv: priv,
            wif: privWIF,
            addr: znAddr
        });
    }

    genZAddress() {
        if(!this.state.passphrase) return;

        const z_secretKey   = zaddress.mkZSecretKey(this.state.passphrase);
        const spendingKey   = zaddress.zSecretKeyToSpendingKey(z_secretKey);
        const a_pk          = zaddress.zSecretKeyToPayingKey(z_secretKey);
        const pk_enc        = zaddress.zSecretKeyToTransmissionKey(z_secretKey);
        const Zaddress      = zaddress.mkZAddress(a_pk, pk_enc);

        this.setState({
            priv: z_secretKey,
            wif: spendingKey,
            addr: Zaddress
        });
    }

    handleCheckRadio(type) {
        this.setState({
            type: type,
            priv: '',
            wif: '',
            addr: ''
        });
    }

    getZpriv() {
        if (this.state.type === 'Z')
            return("private key: " + this.state.priv);
    }

    render() {
        return (
            <Col md={12} id="Brain">
                <hr />
                <Row className="r1">
                    <Col md={3}>
                        <FormGroup>
                            <InputGroup type='radio' name="radioGroup"
                            onMouseDown={() => this.handleCheckRadio('T')}
                            checked={this.state.type === 'T'} inline>
                                T Address
                            </InputGroup>
                            <br />
                            <InputGroup type='radio' name="radioGroup"
                            onMouseDown={() => this.handleCheckRadio('Z')}
                            checked={this.state.type === 'Z'} inline>
                                Z Address
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup controlId="formControlsTextarea">
                            <FormLabel>Secret Passphrase</FormLabel>
                            <FormControl componentClass="textarea"
                                placeholder="Enter your secret passphrase here"
                                value={this.state.inputValue}
                                onChange={e => this.updateInputValue(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <Button variant="secondary" onClick={this.state.type === 'T' ?
                            () => this.genTAddress()
                            : () => this.genZAddress()}
                        >
                            Generate a new wallet
                        </Button>
                    </Col>
                    <Col md={2}>
                        <Button variant="secondary" onClick={window.print}>
                            Print
                        </Button>
                    </Col>
                </Row>
                <hr />
                {this.state.addr ? (
                    <Row className="r2">
                        <Col md={3} className="max-width col-sm-offset-3">
                            <h1 style={{color:'green'}}>Public</h1>
                            <h3>HUSH Address</h3>
                            <div>
                                <QRCode
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                    level="L"
                                    style={{ width: 200 }}
                                    value={this.state.addr}
                                />
                            </div>
                            <div className="zentabcode">
                                {this.state.addr}
                            </div>
                        </Col>
                        <Col md={3} className="max-width">
                            <h1 style={{color:'red'}}>Secret</h1>
                            <div>
                                {this.state.type === 'T' ? (
                                    <h3>Private Key</h3>
                                ) : (
                                    <h3>Spending Key</h3>
                                )}
                                <div>
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="L"
                                        style={{ width: 200 }}
                                        value={this.state.wif}
                                    />
                                </div>
                                <div className="zentabcode">{this.state.wif}</div>
                            </div>
                            <p>{this.getZpriv()}</p>
                        </Col>
                    </Row>
                ) : (
                    <Row className="r2 no-padding"></Row>
                )}
                <hr />
                <Row className="r3">
                    <Col>
                        <p>
                            A brain wallet is generated from a secret passphrase you can choose, usually a long sequence of random words or a long sentence. The purpose of a brain wallet is to be able to only remember your passphrase with no need to write it down. At anytime, anywhere, you can regenerate your wallet here with your passphrase.
                        </p>
                        <p>
                            <b>Warning: Choosing a strong passphrase is important to avoid brute force attempts to guess your passphrase and steal your HUSH.</b>
                        </p>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Brain;