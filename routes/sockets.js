
function controller(io) {
    io.on('connection', (socket) => {
        JSON.parse('{"' + decodeURI(lobby).replace(/&/g, '","').replace(/\+/g, '" "').replace(/=/g, '":"') + '"}')
        // io.emit('join')


        // console.log('a user connected');
        // socket.on('disconnect', () => {
        //   console.log('user disconnected');
        // });
      });

      return io;
}


module.exports = controller;