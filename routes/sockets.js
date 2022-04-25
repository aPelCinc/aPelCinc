let params = "hostname=aa&lobbyname=aaa"

function controller(io) {
    io.on('connection', (socket) => {
      
        // socket.emit('join', lobby, function(err) {
        //   if(err){
        //     alert(err);
        //     window.location.href = '/rooms/create';
        //   }else {
        //     console.log('No Error');
        //   }
        // })


        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });

      return io;
}


module.exports = controller;