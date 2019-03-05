import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navigation from '../general/Navigation';
import UserList from '../general/UserList';
import { Button } from 'reactstrap';
import NewUserModal from '../general/NewUserModal.js';

class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    addUser() {}

    toggle() {
        console.log('toggle');
        this.setState(prevState => ({
            modal: !prevState.modal,
        }));
        console.log(this.state.modal);
    }

    render() {
        return (
            <Wrapper>
                <NewUserModal toggle={this.toggle} modal={this.state.modal} />
                <div>
                    <h3>Current Users</h3>
                    <Button onClick={() => this.toggle()} color="primary">
                        New User
                    </Button>
                </div>
                <UserList
                    users={[{ name: 'John', id: 1 }, { name: 'Admin', id: 2 }]}
                />
            </Wrapper>
        );
    }
}
const Wrapper = styled.div`
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 40px;
    }

    width: 80%;
    margin: 10vw auto;
`;

export default Manage;
