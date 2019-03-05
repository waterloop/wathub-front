import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

class Navigation extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.linkHandler = this.linkHandler.bind(this);
        this.state = {
            isOpen: false,
            isAdmin: this.props.adminStatus,
        };
    }

    toggle() {
        console.log('toggle');
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.state.isAdmin.then(adminStatus => {
            this.setState(prevState => ({
                ...prevState,
                isAdmin: adminStatus,
            }));
        });
    }

    linkHandler(destination) {
        if (this.state.isOpen) this.toggle();
        if (destination === 'logout') {
            axios.post(`${process.env.BACK_END_URL}/logout`).then(() => {
                this.props.history.push('/');
            });
            return;
        }
        if (this.props.checkPermission(destination)) {
            this.props.history.push('/protected/' + destination);
        }
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">WatHub</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink
                                    onClick={() => this.linkHandler('Home')}
                                >
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem />
                            {this.state.isAdmin && (
                                <NavItem>
                                    <NavLink
                                        onClick={() =>
                                            this.linkHandler('manage')
                                        }
                                    >
                                        Manage
                                    </NavLink>
                                </NavItem>
                            )}
                            <NavItem>
                                <NavLink
                                    onClick={() => this.linkHandler('logout')}
                                >
                                    Logout
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const NavLink = styled.div`
    color: white;
    padding: 4px;
    cursor: pointer;
`;

export default withRouter(Navigation);
