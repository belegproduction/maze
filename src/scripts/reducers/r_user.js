import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';
import axios from 'axios';

const initialState = fromJS({});

const user = handleActions({
  LOGIN: (state, { payload: { nickname, token, hash }}) => {
    axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token);
    return state.merge({
      hash,
      nickname,
      token,
    });
  },
  LOGOUT: () => {
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('token');
    return fromJS({});
  },
  CREATE_MATH: (state, { payload: { user }}) => (
    state.merge({
      color: user.color,
    })
  ),
}, initialState);

export default user;
