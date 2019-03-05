import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Col,
    Form,
    FormGroup,
    Label,
    FormText,
    FormFeedback,
} from 'reactstrap';
import styled from 'styled-components';

class NewUserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            firstname: null,
            lastname: null,
            subteam: null,
            admin: false,
            requiredFields: {},
        };
        this.email = React.createRef();
        this.firstname = React.createRef();
        this.lastname = React.createRef();
        this.subteam = React.createRef();
        this.changeHandler = this.changeHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeHandler(event) {
        console.log(this.refs);
        event.persist();
        if (event.target.name === 'email') {
            this.setState(prevState => ({
                ...prevState,
                email: event.target.value,
            }));
        } else if (event.target.name === 'firstname') {
            this.setState(prevState => ({
                ...prevState,
                firstname: event.target.value,
            }));
        } else if (event.target.name === 'lastname') {
            this.setState(prevState => ({
                ...prevState,
                lastname: event.target.value,
            }));
        } else if (event.target.name === 'subteam') {
            this.setState(prevState => ({
                ...prevState,
                subteam: event.target.value,
            }));
        } else if (event.target.name === 'admin') {
            console.log(event.target.checked);
            this.setState(prevState => ({
                ...prevState,
                admin: event.target.checked,
            }));
        }
    }

    onSubmit() {
        let formComplete = true;
        for (const field in this.state) {
            if (this.state[field] === null) {
                console.log(field);
                formComplete = false;
            }
            this.setState(prevState => ({
                ...prevState,
                requiredFields: {
                    ...prevState.requiredFields,
                    [field]: this.state[field] === null,
                },
            }));
        }
        if (!formComplete) return;
        // TODO basic validation
        const requestBody = { ...this.state };
        console.log(requestBody);
        console.log(JSON.stringify(requestBody));
        fetch(`${process.env.BACK_END_URL}/newUser`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(requestBody),
        }).then(this.props.toggle());
        this.setState(prevState => ({
            ...prevState,
            requiredFields: {},
        }));
    }

    render() {
        return (
            <Wrapper>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>
                        Add New User
                    </ModalHeader>
                    <ModalBody>
                        <div>
                            <Form noValidate>
                                <FormGroup row>
                                    <Label for="email" sm={2}>
                                        Email
                                    </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            ref={this.email}
                                            invalid={
                                                this.state.requiredFields.email
                                            }
                                            onChange={this.changeHandler}
                                        />
                                        <FormFeedback invalid="true">
                                            Email is required
                                        </FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="firstname" sm={2}>
                                        First Name
                                    </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            invalid={
                                                this.state.requiredFields
                                                    .firstname
                                            }
                                            ref={this.firstname}
                                            onChange={this.changeHandler}
                                        />
                                        <FormFeedback invalid="true">
                                            First name is required
                                        </FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="lastname" sm={2}>
                                        Last Name
                                    </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            ref={this.lastname}
                                            onChange={this.changeHandler}
                                            invalid={
                                                this.state.requiredFields
                                                    .lastname
                                            }
                                        />
                                        <FormFeedback invalid="true">
                                            Last name is required
                                        </FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="subteam" sm={2}>
                                        Subteam
                                    </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="select"
                                            name="subteam"
                                            id="subteam"
                                            ref={this.subteam}
                                            onChange={this.changeHandler}
                                            invalid={
                                                this.state.requiredFields
                                                    .subteam
                                            }
                                            defaultValue="Pick A Team"
                                        >
                                            <option disabled>
                                                Pick A Team
                                            </option>
                                            <option>Software</option>
                                            <option>Mechanical</option>
                                            <option>Electrical</option>
                                            <option>Marketing</option>
                                        </Input>
                                        <FormFeedback invalid="true">
                                            Subteam is required
                                        </FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="admin" sm={2}>
                                        Admin
                                    </Label>
                                    <Col sm={{ size: 10 }}>
                                        <FormGroup check>
                                            <Input
                                                style={{ marginTop: '11px' }}
                                                type="checkbox"
                                                id="admin"
                                                name="admin"
                                                onChange={this.changeHandler}
                                            />{' '}
                                        </FormGroup>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSubmit}>
                            Create
                        </Button>{' '}
                        <Button color="secondary" onClick={this.props.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    .required {
        border-color: red !important;
    }
`;

export default NewUserModal;
