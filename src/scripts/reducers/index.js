import { combineReducers } from 'redux-immutable';
import general from './r_general';
import maze from './r_maze';
import player from './r_player';
import menu from './r_menu';
import user from './r_user';

const todoApp = combineReducers({
  general,
  maze,
  player,
  menu,
  user,
});

export default todoApp;
