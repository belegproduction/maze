import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import '../styles/layout.scss';
import '../template/index.html';

const main = document.getElementById('root');

render(
    <Root />,
    main
);
