let params = "hostname=aa&lobbyname=aaa"

function controller(io) {
    io.on('connection', (socket) => {

      io.of("/").adapter.on("create-room", (room) => {
        console.log(`room ${room} was created`);
      });
      
      io.of("/").adapter.on("join-room", (room, id) => {
        console.log(`socket ${id} has joined room ${room}`);
      });
        // let lobby = JSON.parse('{"' + decodeURI(params).replace(/&/g, '","').replace(/\+/g, '" "').replace(/=/g, '":"') + '"}')
        // // console.log(lobby);
        // socket.emit('join', lobby, function(err) {
        //   if(err){
        //     alert(err);
        //     window.location.href = '/rooms/create';
        //   }else {
        //     console.log('No Error');
        //   }
        // })


        // console.log('a user connected');
        // socket.on('disconnect', () => {
        //   console.log('user disconnected');
        // });
      });

      return io;
}


module.exports = controller;