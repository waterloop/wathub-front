import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import axios from 'axios';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: props.users,
        };
    }

    async componentDidMount() {
        let response = await axios.get(`${process.env.BACK_END_URL}/allUsers`);
        this.setState({ loading: false, users: response.data });
    }

    render() {
        return (
            <ListGroup>
                {this.state.loading ? (
                    <h1>Loading</h1>
                ) : (
                    this.state.users.map(({ firstname, lastname, _id }) => (
                        <ListGroupItem
                            key={_id}
                            className="justify-content-between"
                        >
                            {`${firstname} ${lastname}`}
                        </ListGroupItem>
                    ))
                )}
            </ListGroup>
        );
    }
}

export default UserList;
