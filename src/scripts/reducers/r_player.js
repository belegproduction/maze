import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = fromJS({path: List()});

const player = handleActions({
  CREATE_PLAYER: (state, { payload: { player, pathPart }}) => (
    state.merge(player).update('path', (path) => path.push(pathPart))
  ),
  GO_PLAYER: (state, { payload: { data, pathPart }}) => (
    state.merge({
      ...data,
    }).update('path', (path) => path.push(pathPart))
  ),
}, initialState);

export default player;
