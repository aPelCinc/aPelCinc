let partides = [];

 
function controller(io) {
  



    io.on('connection', (socket) => {
        console.log(socket.id);

        // io.on("create-room", (room) => {
        //   console.log(`room ${room} was created`);
        // });

        socket.on("createroom",function(data){
          //console.log(data.id);
          socket.join(socket.id);
          partida = data;
          partida.admin = socket.id;
          partida.jugadors = [[socket.id,"edu"]];
          //partida.jugadors.push("jugador2");
          partides[socket.id] = partida;

          console.log("room created id: "+ partida.jugadors);
          socket.emit('getid', {id: socket.id});

        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });

      return io;
}


module.exports = controller;