import axios from 'axios';
import { createAction } from 'redux-actions';
import {SIGN_IN_URL, SIGN_UP_URL, CURRENT_USER_URL} from '../api/user';
import { handlerErrors } from '../helpers';


const requestLogin = createAction('LOGIN', (data) => (data));

export const loginUser = (body) => {
  return async (distpatch) => {
    const { data } = await axios.post(SIGN_IN_URL, body)
        .catch(handlerErrors);
    if (data && data.success) {
      distpatch(requestLogin({
        hash: data.hash,
        nickname: data.nickname,
        token: data.token,
      }));
    }
  };
};

export const registration = (body) => {
  return async (distpatch) => {
    const { data } = await axios.post(SIGN_UP_URL, body)
        .catch(handlerErrors);
    if (data && data.success) {
      distpatch(requestLogin({
        hash: data.hash,
        nickname: data.nickname,
        token: data.token,
      }));
    }
  };
};

export const getCurrentUserAction = () => {
  return async (distpatch) => {
    const { data } = await axios.get(CURRENT_USER_URL)
        .catch(handlerErrors);
    if (data && data.success) {
      distpatch(requestLogin({
        hash: data.hash,
        nickname: data.nickname,
        token: localStorage.getItem('token'),
      }));
    }
  };
};

export const logout = createAction('LOGOUT');
