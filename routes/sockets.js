let partides = [];

var cards = ['1o','2o','3o','4o','5o','6o','7o','8o','9o','10o','11o','12o'];
cards.push('1c','2c','3c','4c','5c','6c','7c','8c','9c','10c','11c','12c');
cards.push('1b','2b','3b','4b','5b','6b','7b','8b','9b','10b','11b','12b');
cards.push('1e','2e','3e','4e','5e','6e','7e','8e','9e','10e','11e','12e');

 
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
          console.log(socket);
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

        socket.on("startgame",function(data){

          // shuffle cards
          for (i=0;i<48;i++)
            {
            	posicion1=parseInt(Math.random()*48);
            	tmp=cards[i];
            	cards[i]=cards[posicion1];
            	cards[posicion1]=tmp;
            }

          var quo = Math.floor(48/partides[socket.id].jugadors.length);

          // Assign cards to players
          for(i=0;i<partides[socket.id].jugadors.length;i++){
            console.log('cards');
            partides[socket.id].jugadors[i].cards = [];

            for (let y = 0; y < quo; y++) {
              partides[socket.id].jugadors[i].cards.push(cards[y])
            }

            //send cards to client
          io.to(partides[socket.id].jugadors[i][0]).emit('initcards', {cards: partides[socket.id].jugadors[i]})
          }

          
        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });



      return io;
}

module.exports = controller;
