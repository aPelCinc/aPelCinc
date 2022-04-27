let partides = [];

 
function controller(io) {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on("name",function(data){
          console.log('nom = '+data.nom);
          socket.name = data.nom;
        });

        // io.on("create-room", (room) => {
        //   console.log(`room ${room} was created`);
        // });

        // Defined a event websocket 'chat message' in server
        socket.on('chat message', (msg) => {
          console.log(socket.rooms);
          console.log('message of '+socket.id+': '+msg);
          // send var msg value call event websocket 'chat message' in client
          io.emit('chat message', msg);
        });

        socket.on("joinroom",function(data){   

          socket.join(data.codi);
          partides[data.codi].jugadors.push([socket.id,'alex'])
          io.to(data.codi).emit('jugadors', {jugadors: partides[data.codi].jugadors});

        });
        
        socket.on("createroom",function(data){

          socket.join(socket.id);
          partida = data;
          partida.admin = socket.id;
<<<<<<< HEAD
          partida.jugadors = [[socket.id,socket.name]];
          //partida.jugadors.push("jugador2");
=======
          partida.jugadors = [[socket.id,"edu"]];

>>>>>>> b2ee5276e574167f72dbe900e928a15bd7328050
          partides[socket.id] = partida;

          console.log("room created id: "+ socket.id);
          io.emit('getid', {id: socket.id});
          io.emit('jugadors', {jugadors: partida.jugadors});

        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });

      return io;
}

module.exports = controller;
