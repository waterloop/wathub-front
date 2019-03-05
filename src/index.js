import React from "react";
import ReactDOM from "react-dom";
import App from './components/App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faUser);

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);

// I have no idea what this does
if (module.hot) {
    module.hot.accept();
}
