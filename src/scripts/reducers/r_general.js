import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';
import { SIGN_UP, SIGN_IN } from '../constants/authorization';

const initialState = fromJS({
  isShowMenu: true,
  typeForm: SIGN_UP,
  rooms: List(),
  room: null,
});

const general = handleActions({
  MENU_IS_SHOW: (state, { payload }) => (
    state.merge({
      isShowMenu: payload.isShow,
      isShowMaze: !payload.isShow,
    })
  ),
  MAZE_IS_SHOW: (state, { payload }) => (
    state.merge({
      isShowMenu: !payload.isShow,
      isShowMaze: payload.isShow,
    })
  ),
  CHANGE_TYPE_FORM: (state, { payload }) => (
    state.merge({
      typeForm: payload.typeForm,
    })
  ),
  UPDATE_ROOMS: (state, { payload: { rooms } }) => (
    state.merge({
      rooms,
    })
  ),
  SET_ROOMS: (state, { payload: { rooms } }) => (
    state.merge({
      rooms,
    })
  ),
  OPEN_ROOM: (state, { payload: { room } }) => (
    state.merge({
      room,
    })
  ),
  UPDATE_ROOM: (state, { payload: { room } }) => (
    state.merge({
      room,
    })
  ),
  LOGOUT: (state) => (
    state.merge({
      room: null,
    })
  ),
}, initialState);


export default general;
