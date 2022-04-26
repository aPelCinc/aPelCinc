
function controller(io) {
  // Defined a event websocket 'connection' in server
  io.on('connection', (socket) => {
    console.log('a user connected');

    // Defined a event websocket 'chat message' in server
    socket.on('chat message', (msg) => {
      console.log(socket.rooms);
      console.log('message of '+socket.id+': '+msg);
      // send var msg value call event websocket 'chat message' in client
      io.emit('chat message', msg);
    });

    // Defined a event websocket 'disconnect' in server
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
}

module.exports = controller;
