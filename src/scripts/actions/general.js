import axios from 'axios';
import { createAction } from 'redux-actions';
import { POST_GRID_URL, POST_ROOM_URL } from '../constants/general';
import { handlerErrors } from '../helpers';

const postGrid = async (body) => {
  return await axios.post(POST_GRID_URL, body).catch(handlerErrors);
};

const makeRoom = async (body) => {
  return await axios.post(POST_ROOM_URL, body).catch(handlerErrors);
};

const updateRoom = async (hash, body) => {
  return await axios.put(`${POST_ROOM_URL}/${hash}`, body).catch(handlerErrors);
};

export const setRoomsToStore = createAction('SET_ROOMS', (rooms) => ({
  rooms,
}));

export const openRoom = createAction('OPEN_ROOM', (room) => ({
  room,
}));

export const updateRoomAction = createAction('UPDATE_ROOM', (room) => ({
  room,
}));

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

export const changeTypeForm = createAction('CHANGE_TYPE_FORM', (typeForm) => ({
  typeForm,
}));

export const updateRooms = createAction('UPDATE_ROOMS', (rooms) => ({
  rooms,
}));

export const postRoom = (body) => {
  return async (distpatch) => {
    const { data } = await postGrid(body.grid);
    const grid = data.grid;
    if (data.success) {
      const { data } = await makeRoom({
        title: body.title,
        gridHash: grid.hash,
        gridSize: grid.size,
      });
      distpatch(openRoom(data.room));
    }
  };
};

export const putRoom = (params) => {
  return async (distpatch) => {
    const { data } = await updateRoom(params.hash, params.body);
    if (data.success) {
      distpatch(updateRoomAction(data.room));
    }
  };
};
