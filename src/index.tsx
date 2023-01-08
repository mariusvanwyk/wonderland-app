import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import UserService from "./services/UserService";
import HttpService from "./services/HttpService";
import AuthenticationNotPossible from "./components/AuthenticationNotPossible";
import {store} from "./components/redux/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const renderApp = () => root.render(<Provider store={store}><App/></Provider>)
const renderError = () => root.render(<AuthenticationNotPossible/>)

UserService.initKeycloak(renderApp, renderError);
HttpService.configure();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.debug))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

