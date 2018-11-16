global.clientsMaze = {};

module.exports = {
  async handler(ctx, next) {
    const mazeHash = ctx.state.mazeHash;
    if (Array.isArray(global.clientsMaze[mazeHash])) {
      global.clientsMaze[mazeHash].push(ctx.websocket);
    } else {
      global.clientsMaze[mazeHash] = [ctx.websocket];
    }

    ctx.websocket.on('close', () => {
      // console.log('websocket closed');
      // global.clientsMaze.forEach((client) => {
      //   if (client.readyState !== ctx.websocket.CLOSED ) {
      //     client.send(JSON.stringify({
      //       type: 'CLOSE',
      //     }));
      //   }
      // });
      // grid = null;
      // global.clientsMaze = [];
      // players = [];
    });
    ctx.websocket.on('message', (message) => {
      const payload = JSON.parse(message);
      const type = payload.type.trim();
      if (Array.isArray(global.clientsMaze[mazeHash])) {
        global.clientsMaze[mazeHash].forEach((client) => {
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
              client.send(JSON.stringify({
                type: 'GAME_OVER',
                value: {
                  userHash: payload.value.userHash,
                },
              }));
              client.close();
            }
          }
        });
      } else {
        throw new AppError({ status: 404, message: 'mazeHash not found' });
      }
    });
    await next();
  },
};
