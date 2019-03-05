import React from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Link,
    Switch,
    withRouter,
} from 'react-router-dom';
import Login from './pages/Login';
import Protected from './Protected';
import PageNotFound from './pages/PageNotFound';
import SignUp from './pages/SignUp';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <Login />} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/protected" component={Protected} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        );
    }
}

export default App;
