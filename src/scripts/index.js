import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import '../styles/layout.scss';
import axios from 'axios';

const token = localStorage.getItem('token');

if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}

const main = document.getElementById('root');

render(
    <Root />,
    main
);
