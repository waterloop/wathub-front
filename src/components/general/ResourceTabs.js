import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import styled from 'styled-components';
import axios from 'axios';

axios.defaults.withCredentials = true;

class ResourceTabs extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
        activeTab: '1',
        user: props.user,
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
        console.log(this.state.user);
      console.log(this.state.user.resources);
  }

  componentWillReceiveProps(newProps) {
      this.setState((prevState, props) => ({...prevState, user: newProps.user})); 
  }

  render() {
      var resourceJSX = [];
      console.log(this.state);
      if (this.state.user.resources) {
          console.log(this.state.user.resources);
          this.state.user.resources.map((resource, index) => {resourceJSX.push(<div key={index} className="border resourceElement">{resource}</div>)});
      }
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Overview
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Resources
            </NavLink>
          </NavItem>
        </Nav>
        <StyledTabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                  <h6>Pinned Resources</h6>
                  <div id="pinnedResources">
                    {resourceJSX}                    
                  </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </StyledTabContent>
      </div>
    );
  }
}

const StyledTabContent = styled(TabContent)`

    .resourceElement {
       padding: 20px; 
       margin-bottom: 10px;
    }

    .border {
        border-radius: 3px;
    }
    padding: 20px 0;
`;


export default ResourceTabs;
