import { combineReducers } from 'redux-immutable';
import general from './r_general';
import maze from './r_maze';
import player from './r_player';
import menu from './r_menu';

const todoApp = combineReducers({
  general,
  maze,
  player,
  menu,
});

export default todoApp;
