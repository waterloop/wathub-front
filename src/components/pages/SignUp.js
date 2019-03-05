import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { Alert, FormGroup, Label, Form, Button, Input } from 'reactstrap';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            onboardingcode: null,
            firstname: null,
            lastname: null,
            password: null,
            repeatpassword: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    modifyState(keyValueMap) {
        for (let [key, value] of keyValueMap) {
            this.setState(prevState => ({
                ...prevState,
                [key]: value,
            }));
        }
    }

    handleChange(event) {
        switch (String(event.target.name)) {
            case 'onboardingcode':
                this.modifyState(
                    new Map([['onboardingcode', event.target.value]])
                );
                break;
            case 'firstname':
                this.modifyState(new Map([['firstname', event.target.value]]));
                break;
            case 'lastname':
                this.modifyState(new Map([['lastname', event.target.value]]));
                break;
            case 'password':
                this.modifyState(new Map([['password', event.target.value]]));
                break;
            case 'repeatpassword':
                this.modifyState(
                    new Map([['repeatpassword', event.target.value]])
                );
                break;
        }
    }

    async onSubmit() {
        fetch(`${process.env.BACK_END_URL}/registerUser`, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
            method: 'post',
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.registerSuccessfull) {
                    this.props.history.push('/');
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        error: 'something went wrong',
                    }));
                }
            });
    }

    render() {
        return (
            <Wrapper>
                <div className="border" id="signup">
                    <h2>Join WatHub</h2>
                    <p>
                        Before signing up, please contact your team lead or
                        contact the web team to get your onbording code.
                    </p>
                    {this.state.error != null && (
                        <Alert color="danger">{this.state.error}</Alert>
                    )}
                    <Form onSubmit={this.handleSubmit}>
                        {this.state.signUpFailed && (
                            <Alert color="danger">
                                <p>Username or password is wrong</p>
                            </Alert>
                        )}
                        <FormGroup>
                            <Label for="onboardingcode">Onboarding Code</Label>
                            <Input
                                type="text"
                                name="onboardingcode"
                                id="onboardingcode"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstname">First Name</Label>
                            <Input
                                type="text"
                                name="firstname"
                                id="firstname"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastname">Last Name</Label>
                            <Input
                                type="text"
                                name="lastname"
                                id="lastname"
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
                        <FormGroup>
                            <Label for="repeatpassword">Repeat Password</Label>
                            <Input
                                id="repeatpassword"
                                type="password"
                                name="repeatpassword"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Button
                            onClick={this.onSubmit}
                            color="warning"
                            value="Log In"
                        >
                            Sign Up
                        </Button>
                    </Form>
                </div>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;

    #signup {
        padding: 20px;
        border-radius: 3px;
        width: 480px;
        background-color: white;
    }
`;

export default withRouter(SignUp);
