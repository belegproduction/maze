
export const POST_GRID_URL = '/api/grids';

export const POST_ROOM_URL = '/api/rooms';

export const WS_ROOMS_URL = `${location.href.includes('https') ? 'wss' : 'ws'}://${location.host}/ws/list/rooms`;

export const WS_ROOM_URL = `${location.href.includes('https') ? 'wss' : 'ws'}://${location.host}/ws/rooms`;

export const WS_MATH_URL = `${location.href.includes('https') ? 'wss' : 'ws'}://${location.host}/ws/game`;

