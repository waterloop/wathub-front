import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { Alert, FormGroup, Label, Form, Button, Input } from 'reactstrap';

axios.defaults.withCredentials = true;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginFailed: false,
            passwordFailed: false,
            usernameFailed: false,
            loginSuccessfull: false,
            username: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.persist();
        if (event.target.name === 'username') {
            this.setState((prevState, props) => {
                prevState.username = event.target.value;
                return prevState;
            });
        } else if (event.target.name === 'password') {
            this.setState((prevState, props) => {
                prevState.password = event.target.value;
                return prevState;
            });
        }
    }

    handleSubmit(event) {
        event.persist();
        event.preventDefault();
        this.setState((prevState, props) => {
            prevState.loginFailed = false;
            return prevState;
        });
        axios
            .post(`${process.env.BACK_END_URL}/login`, {
                username: this.state.username,
                password: this.state.password,
            })
            .then(response => {
                console.log(response);
                if (response.data.authStatus) {
                    this.props.history.push('/protected/home');
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        loginFailed: true,
                        passwordFailed: !response.data.password,
                        usernameFailed: !response.data.username,
                    }));
                }
            });
    }

    render() {
        return (
            <Wrapper>
                <img width="120px" src="../../img/waterloop_icon.svg" />
                <h3>Sign in to WatHub</h3>
                <Form onSubmit={this.handleSubmit}>
                    {this.state.loginFailed && (
                        <Alert color="danger">
                            <p>
                                {this.state.usernameFailed
                                    ? 'Username is incorrect'
                                    : 'Password is incorrect'}
                            </p>
                        </Alert>
                    )}
                    <div id="formWrapper" className="border">
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Button color="warning" type="submit" value="Log In">
                            Sign in
                        </Button>
                    </div>
                    <div className="border" id="newAccount">
                        <p>
                            New to WatHub?{' '}
                            <Link to="/signup">Create an account.</Link>
                        </p>
                    </div>
                </Form>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    flex-direction: column;

    h3 {
        margin-top: 20px;
    }

    button {
        width: 100%;
    }

    .alert {
        width: 100%;
        p {
            margin: 0;
        }
    }

    .border {
        border-radius: 3px;
    }

    #newAccount {
        border-radius: 3px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;

        p {
            margin: 0;
        }
    }

    form {
        input {
            min-width: 300px;
        }
        margin-top: 20px;
        flex-direction: column;
        display: flex;
        align-items: center;
    }

    #formWrapper {
        padding: 20px;
        margin-bottom: 20px;
        background-color: white;
    }
`;

export default withRouter(Login);
