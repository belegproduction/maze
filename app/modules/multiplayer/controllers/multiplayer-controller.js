let grid = null;
let clients = [];
let players = [];


module.exports = {
  async handler(ctx, next) {
    clients.push(ctx.websocket);
    ctx.websocket.send(JSON.stringify({
      type: 'CONNECT',
      value: {
        grid,
        enemies: players,
      },
    }));
    ctx.websocket.on('close', () => {
      console.log('websocket closed');
      clients.forEach((client) => {
        if (client.readyState !== ctx.websocket.CLOSED ) {
          client.send(JSON.stringify({
            type: 'CLOSE',
          }));
        }
      });
      grid = null;
      clients = [];
      players = [];
    });
    ctx.websocket.on('message', (message) => {
      const payload = JSON.parse(message);
      const type = payload.type.trim();
      if (payload.type && type === 'CREATE_GRID') {
        grid = payload.value.grid;
      }
      clients.forEach((client) => {
        if (client.readyState !== ctx.websocket.CLOSED ) {
          if (type === 'CREATE_PLAYER') {
            players.push(payload.value.player);
            client.send(JSON.stringify({
              type: 'CREATE_PLAYER',
              value: {
                player: payload.value.player,
              },
            }));
          } else if (type === 'GO_PLAYER') {
            client.send(JSON.stringify({
              type: 'GO_PLAYER',
              value: {
                player: payload.value.player,
              },
            }));
          } else if (type === 'GAME_OVER') {
            clients = [];
            players = [];
            grid = null;
            
            client.send(JSON.stringify({
              type: 'GAME_OVER',
              value: {
                playerId: payload.value.playerId,
              },
            }));
          }
        }
      });
    });
    await next();
  },
};
