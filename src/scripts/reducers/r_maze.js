import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = fromJS({
  enemies: List()
});

const maze = handleActions({
  CREATE_GRID: (state, { payload: { grid }}) => (
    state.set('grid', grid)
  ),
  UPDATE_ENEMIES: (state, { payload: { enemies }}) => (
    state.set('enemies', enemies)
  ),
}, initialState);

export default maze;
