import React from 'react';
import axios from 'axios';
import Navigation from './general/Navigation';
import Home from './pages/Home';
import Manage from './pages/Manage';
import RequireAuth from './general/RequireAuth';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

axios.defaults.withCredentials = true;

class Protected extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation
                    adminStatus={auth.checkAdmin()}
                    checkPermission={auth.checkPermission}
                />
                <Switch>
                    <Route
                        path="/protected/home"
                        exact
                        component={RequireAuth(Home, auth.checkPermission)}
                    />
                    <Route
                        path="/protected/manage"
                        exact
                        component={RequireAuth(Manage, auth.checkPermission)}
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

const auth = {
    async checkPermission(url) {
        if (url === 'signin' || url === 'signup' || url === 'logout')
            return true;
        let response = await axios.get(
            `${process.env.BACK_END_URL}\\authCheck`
        );
        if (url === 'manage') {
            return response.data.authStatus && response.data.admin;
        }
        return response.data.authStatus;
    },
    async checkAdmin() {
        let response = await axios.get(
            `${process.env.BACK_END_URL}\\authCheck`
        );
        return response.data.admin;
    },
    signout(callback) {
        axios.post(`process.env.BACK_END_URL\${signOut}`);
    },
};

export default Protected;
