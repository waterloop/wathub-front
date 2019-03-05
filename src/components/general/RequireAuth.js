import { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
axios.default.withCredentials = true;

const RequireAuth = (Component, checkStatus) => {
    class App extends React.Component {
        _isMounted = false;
        constructor(props) {
            super(props);
            this.state = {
                isAuthenticated: false,
                isLoading: true,
            };
            this.verifyPermissions = this.verifyPermissions.bind(this);
        }

        async verifyPermissions() {
            let authenticated = await checkStatus(this.props.location);
            console.log(authenticated);
            if (authenticated) {
                if (this._isMounted)
                    this.setState({ isAuthenticated: true, isLoading: false });
            } else {
                console.log(authenticated);
                if (this._isMounted)
                    this.setState({ isAuthenticated: false, isLoading: false });
            }
        }

        componentDidMount() {
            this._isMounted = true;
            this.verifyPermissions();
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        render() {
            const { isAuthenticated, isLoading } = this.state;
            if (isLoading) {
                return <div>Loading...</div>;
            }
            if (!isAuthenticated) {
                return <Redirect to="/" />;
            }
            return <Component checkPermission={checkStatus} {...this.props} />;
        }
    }
    return withRouter(App);
};

export default RequireAuth;
