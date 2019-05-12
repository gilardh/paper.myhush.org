import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import { randomBytes } from 'crypto-browserify';




import Single   from "./Single";
import Brain    from "./Brain";
import Bulk     from "./Bulk";
import Details  from "./Details";
import Multisig from "./Multisig";
import Paper    from "./Paper";
import Entropy  from "./Entropy";

export default class MainPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entropy: {
              random: randomBytes(1),
              isStillSeeding: true,
              seedLimit: 200 + Math.floor(randomBytes(12)[11]),
              seedCount: 0,
              lastInputTime: new Date().getTime(),
              seedPoints: []
            },
            activeTab: 0
        };
    }

    getCategories() {
        return [
            { id: 0,    title: "Single Address",        content: Single },
            { id: 1,    title: "Paper",                 content: Paper },
            { id: 2,    title: "Brain Wallet",          content: Brain },
            { id: 3,    title: "Multisig Wallet",       content: Multisig },
            { id: 4,    title: "Bulk Wallet",           content: Bulk },
            { id: 5,    title: "Wallet Details",        content: Details }
        ];
    }

    setEntropy(x){
      this.setState({entropy: x});
    }
    getEntropy(){
      return this.state.entropy;
    }

    selectTab(key) {
        this.setState({ activeNavTab: key });

        const Comp = this.getCategories()[key].content;
        if (Comp === Details) {
            document.querySelectorAll('.seedpoint').forEach(d => d.style.visibility = 'hidden');
        } else {
            document.querySelectorAll('.seedpoint').forEach(d => d.style.visibility = 'visible');
        }
    }

    tabContent(id) {
      const Comp = this.getCategories()[id].content;

      if( Comp === Details ){
        return <Comp />;
      }
      if( this.state.entropy.isStillSeeding ){
          return(<Entropy
            setEntropy={this.setEntropy.bind(this)}
            getEntropy={this.getEntropy.bind(this)}
          />);

      } else {
        return <Comp entropy={this.state.entropy.random} />;
      }
    }

    renderMainPanel() {
        return (
            <Tabs id="nav" bsStyle="pills" justified
                activeKey={this.state.activeNavTab}
                onSelect={this.selectTab.bind(this)}
                className = "zenTabsWrap"
            >
                {this.getCategories().map((category) => (
                    <Tab key={category.id}
                        eventKey={category.id}
                        title={category.title}
                        className="zenTabs clearfix"
                    >
                        {this.tabContent(category.id)}
                    </Tab>
                ))}
            </Tabs>
        );
    }


    render() {
        return (
            <div id="body">
                <Container>
                    <Row>
                        <Col sm={12}>
                            {this.renderMainPanel()}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}