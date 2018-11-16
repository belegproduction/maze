let clients = {};

module.exports = {
  async handler(ctx, next) {
    const mathHash = ctx.state.mathHash;
    if (Array.isArray(clients[mathHash])) {
      clients[mathHash].push(ctx.websocket);
    } else {
      clients[mathHash] = [ctx.websocket];
    }
    
    console.log(clients);

    ctx.websocket.on('close', () => {
      // console.log('websocket closed');
      // clients.forEach((client) => {
      //   if (client.readyState !== ctx.websocket.CLOSED ) {
      //     client.send(JSON.stringify({
      //       type: 'CLOSE',
      //     }));
      //   }
      // });
      // grid = null;
      // clients = [];
      // players = [];
    });
    ctx.websocket.on('message', (message) => {
      const payload = JSON.parse(message);
      const type = payload.type.trim();
      if (Array.isArray(clients[mathHash])) {
        clients[mathHash].forEach((client) => {
          if (client.readyState !== ctx.websocket.CLOSED ) {
            if (type === 'CREATE_PLAYER') {
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
              delete clients[mathHash];
              client.send(JSON.stringify({
                type: 'GAME_OVER',
                value: {
                  userHash: payload.value.userHash,
                },
              }));
            }
          }
        });
      } else {
        throw new AppError({ status: 404, message: 'Math not found' });
      }
    });
    await next();
  },
};
