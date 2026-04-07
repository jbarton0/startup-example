const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  // 1. Create the server WITHOUT attaching it to the httpServer yet
  const socketServer = new WebSocketServer({ server: httpServer });

  // 2. Manually handle the 'upgrade' event from the HTTP server
//   httpServer.on('upgrade', (request, socket, head) => {
//     socketServer.handleUpgrade(request, socket, head, (ws) => {
//       socketServer.emit('connection', ws, request);
//     });
//   });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;

    socket.on('message', function message(data) {
      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === 1) { // 1 = OPEN
          client.send(data);
        }
      });
    });

    socket.on('pong', () => { socket.isAlive = true; });
  });

  setInterval(() => {
    socketServer.clients.forEach((client) => {
      if (client.isAlive === false) return client.terminate();
      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };