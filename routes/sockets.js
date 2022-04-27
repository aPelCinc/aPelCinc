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
          partides[data.codi].jugadors.push([socket.id,socket.name])
          io.to(data.codi).emit('jugadors', {jugadors: partides[data.codi].jugadors});
          io.to(socket.id).emit('partida', {partida: partides[data.codi]});

        });
        
        socket.on("createroom",function(data){
          let codiTaula = socket.id.substring(1,5);
          socket.join(codiTaula);
          partida = data;
          partida.id = codiTaula;
          partida.admin = socket.id;
          partida.jugadors = [[socket.id,socket.name]];
          //partida.jugadors.push("jugador2");
          partides[codiTaula] = partida;

          console.log("room created id: "+ socket.id);
          console.log(partides[codiTaula]);
          console.log(partides);
          //io.emit('getid', {id: socket.id});
          io.to(socket.id).emit('partida', {partida: partides[codiTaula]});
          io.to(socket.id).emit('jugadors', {jugadors: partida.jugadors});


        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });

      return io;
}

module.exports = controller;
