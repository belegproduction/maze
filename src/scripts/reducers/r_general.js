import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = fromJS({
  isShowMenu: true,
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
}, initialState);


export default general;
