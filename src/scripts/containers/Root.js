import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import General from './General';

const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <General />
      </Provider>
    );
  }
}

export default Root;
