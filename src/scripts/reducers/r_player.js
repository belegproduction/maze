import { pathFirst } from '../constants/player';
import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

const initialState = fromJS({pathFirst, path: List()});

const player = handleActions({
  CREATE_PLAYER: (state, { payload: { player }}) => (
    state.merge(player)
  ),
  GO_PLAYER: (state, { payload: { data }}) => (
    state.merge(data)
  ),
  PUT_DISTANCE_TRAVELED: (state, { payload: { pathPart }}) => (
    state.update('path', (path) => path.push(pathPart))
  ),
}, initialState);

export default player;
