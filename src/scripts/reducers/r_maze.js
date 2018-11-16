import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = fromJS({
  enemies: List(),
});

const maze = handleActions({
  CREATE_MATH: (state, { payload: { grid, mazeHash, enemies }}) => (
    state.merge({
      grid,
      mazeHash,
      enemies,
    })
  ),
  UPDATE_ENEMIES: (state, { payload: { enemies }}) => (
    state.set('enemies', enemies)
  ),
}, initialState);

export default maze;
