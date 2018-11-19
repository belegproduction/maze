import mobile from 'is-mobile';

export const POST_GRID_URL = '/api/grids';

export const POST_ROOM_URL = '/api/rooms';

export const WS_ROOMS_URL = `${location.href.includes('https') ? 'wss' : 'ws'}://${location.host}/ws/list/rooms`;

export const WS_ROOM_URL = `${location.href.includes('https') ? 'wss' : 'ws'}://${location.host}/ws/rooms`;

export const WS_MATH_URL = `${location.href.includes('https') ? 'wss' : 'ws'}://${location.host}/ws/game`;

export const SIZES = [
  {
    title: 'Малый',
    value: 15,
  },
  {
    title: 'Средний',
    value: 35,
  },
  {
    title: 'Большой',
    value: 50,
  },
  {
    title: 'Огромный',
    value: 90,
  },
];


export const DIRECTION_MOVE = {
  bottom: {
    moveX: 0,
    moveY: 1,
  },
  top: {
    moveX: 0,
    moveY: -1,
  },
  left: {
    moveX: -1,
    moveY: 0,
  },
  right: {
    moveX: 1,
    moveY: 0,
  },
};

export const IS_MOBILE = mobile();
