import { createAction } from 'redux-actions';

export const showMenu = createAction('MENU_IS_SHOW', () => ({
  isShow: true,
}));

export const hideMenu = createAction('MENU_IS_SHOW', () => ({
  isShow: false,
}));

export const showMaze = createAction('MAZE_IS_SHOW', () => ({
  isShow: true,
}));

export const hideMaze = createAction('MAZE_IS_SHOW', () => ({
  isShow: false,
}));

