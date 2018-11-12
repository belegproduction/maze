import { createGetSelector } from 'reselect-immutable-helpers';

const getGeneral = createGetSelector((state) => (state), 'general');

const getMaze = createGetSelector((state) => (state), 'maze');

export const isShowMenuSelector = createGetSelector(getGeneral, 'isShowMenu');

export const isShowMazeSelector = createGetSelector(getGeneral, 'isShowMaze');

export const getPlayer = createGetSelector((state) => (state), 'player');

export const getPath = createGetSelector(getPlayer, 'path');

export const getGrid = createGetSelector(getMaze, 'grid');

export const getEnemies = createGetSelector(getMaze, 'enemies');
