import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

// helpers
import { SERVER_URL, ACESS_TOKEN } from './Helpers/config'
import './index.css';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';


axios.defaults.baseURL = SERVER_URL;
axios.defaults.headers.common['Authorization'] = ACESS_TOKEN;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers['access-token'] = ACESS_TOKEN;

ReactDOM.render(
    <Routes />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
