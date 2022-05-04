let partides = [];

var cards = ['o1','o2','o3','o4','o5','o6','o7','o8','o9','o10','o11','o12'];
  cards.push('c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12');
  cards.push('b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12');
  cards.push('e1','e2','e3','e4','e5','e6','e7','e8','e9','e10','e11','e12');

 
function controller(io) {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on("name",function(data){
          console.log('nom = '+data.nom);
          if (data.nom == '' || data.nom == ' ') {
            io.emit('error' , 'El nom del Jugador es obligatori', 'player');
          } else {
            socket.name = data.nom;
            io.emit('changetoscreen', data.button);
          }
        });

        // io.on("create-room", (room) => {
        //   console.log(`room ${room} was created`);
        // });

        // Defined a event websocket 'chat message' in server
        socket.on('chat message', (msg, codi) => {
          console.log('message of '+socket.id+': '+msg);
          // send var msg value call event websocket 'chat message' in client
          io.to(partides[codi].id).emit('chat message', msg, socket.name);
        });

        socket.on("joinroom",function(data) {
          if (data.codi == '' || data.codi == ' ') {
            io.emit('error name' , 'El numero de la Sala es obligatori', 'roomjoin');
          } else {
            socket.join(data.codi);
            socket.codi = data.codi;
            // console.log(socket);
            partides[data.codi].jugadors.push([socket.id,socket.name])
            io.to(data.codi).emit('jugadors', {jugadors: partides[data.codi].jugadors});
            io.to(socket.id).emit('partida', {partida: partides[data.codi]});
            
            io.emit('changetoscreen', data.button);
          }

        });
        
        socket.on("createroom",function(data){
          if (data.nom == '' || data.nom == ' ') {
            io.emit('error name' , 'El nom de la Sala es obligatori', 'roomcreate');
          } else {
            let codiTaula = socket.id.substring(1,5);
            socket.codi = codiTaula;
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

            console.log(partides);

            io.emit('changetoscreen', data.button);
          }
        });

        socket.on("startgame",function(data){

          if(typeof partides[socket.codi] == 'undefined'){
            io.emit('error','No tens permisos per iniciar la partida');
          } else {
                      // shuffle cards
            for (i=0;i<48;i++)
            {
              posicion1=parseInt(Math.random()*48);
              tmp=cards[i];
              cards[i]=cards[posicion1];
              cards[posicion1]=tmp;
            }

          var quo = Math.floor(48/partides[socket.codi].jugadors.length);

          // Assign cards to players
          var numcard = 0;
          for(i=0;i<partides[socket.codi].jugadors.length;i++){
            partides[socket.codi].jugadors[i].cards = [];
            

            for (let y = 0; y < quo; y++) {
              partides[socket.codi].jugadors[i].cards.push(cards[numcard])
              numcard++;
            }

            //send cards to client
            
            io.to(partides[socket.codi].jugadors[i][0]).emit('initcards', {cards: partides[socket.codi].jugadors[i].cards});
          }
          console.log(partides[socket.codi].jugadors);
        }
          
        });

        socket.on("leaveroom",function(data){
          if(typeof socket.codi !== 'undefined'){
            if(partides[socket.codi].jugadors.length !== 1){
              for (let y = 0; y < partides[socket.codi].jugadors.length; y++){
                if(socket.id == partides[socket.codi].jugadors[y][0]){
                 partides[socket.codi].jugadors.splice(y,1);
                }
              }
              io.to(socket.codi).emit('jugadors', {jugadors: partides[socket.codi].jugadors});
              socket.leave(socket.codi);
              console.log("Room updated")
            } else {
              partides.splice(socket.codi,1);
              socket.leave(socket.codi);
              console.log("Room removed")
            }
          }
        });

        socket.on('disconnect', () => {

          if(typeof socket.codi !== 'undefined'){
            if(partides[socket.codi].jugadors.length !== 1){
              for (let y = 0; y < partides[socket.codi].jugadors.length; y++){
                if(socket.id == partides[socket.codi].jugadors[y][0]){
                 partides[socket.codi].jugadors.splice(y,1);
                }
              }
              io.to(socket.codi).emit('jugadors', {jugadors: partides[socket.codi].jugadors});
              console.log("Room updated")
            } else {
              partides.splice(socket.codi,1);
              console.log("Room removed")
            }
          }
          console.log('user disconnected');
        });
      });



      return io;
}

module.exports = controller;
