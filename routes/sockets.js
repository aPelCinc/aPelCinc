let partides = [];

var cards = ['1o','2o','3o','4o','5o','6o','7o','8o','9o','10o','11o','12o'];
cards.push('1c','2c','3c','4c','5c','6c','7c','8c','9c','10c','11c','12c');
cards.push('1b','2b','3b','4b','5b','6b','7b','8b','9b','10b','11b','12b');
cards.push('1e','2e','3e','4e','5e','6e','7e','8e','9e','10e','11e','12e');

function checkCenterCards(typeCard, arrayCenterCards, allowedCards, quo) {
  // Sort array in string
  arrayCenterCards.sort();

  // If center card array length is equals to 0
  if (arrayCenterCards.length == 0) {
    // Only allowed 5, and type card concat
    allowedCards.push('5'+typeCard);

  // If center card array length is equals to 1 and start with 5
  } else if (arrayCenterCards.length == 1 && arrayCenterCards[0].startsWith('5')) {
    // Only allowed 4 or 6, and type card concat
    allowedCards.push('4'+typeCard);
    allowedCards.push('6'+typeCard);

  // If center card array length is greater that 1
  } else if (arrayCenterCards.length > 1) {
    // Create a copy of center card array
    var arrayCenterCardsCopy = [];

    // running center card array
    for (let i = 0; i < arrayCenterCards.length; i++) {
      // save in copy of center card array, value substring (the char 0 to final char) of the center card array
      arrayCenterCardsCopy[i] = parseInt(arrayCenterCards[i].substring(0,arrayCenterCards[i].length-1));
    }

    // Sort array in integer
    arrayCenterCardsCopy.sort(function(a, b){return a - b});

    // Get a min and max to copy of center card array
    var min = arrayCenterCardsCopy[0];
    var max = arrayCenterCardsCopy[arrayCenterCardsCopy.length-1];

    // If min is greater that 1
    if (min > 1) {
      // Only allowed min less 1, and type card concat
      allowedCards.push((min-1)+typeCard);
    }
    // If max is minor that variable quo
    if (max < quo) {
      // Only allowed max more 1, and type card concat
      allowedCards.push((max+1)+typeCard);
    }
  }
}

function controller(io) {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on("name",function(data){
          console.log('nom = '+data.nom);
          if (data.nom == '' || data.nom == ' ') {
            console.log(socket.id);
            socket.emit('error name' , 'El nom del Jugador es obligatori', 'player');
          } else {
            socket.name = data.nom;
            socket.emit('changetoscreen', data.button);
          }
        });

        // io.on("create-room", (room) => {
        //   console.log(`room ${room} was created`);
        // });

        // Defined a event websocket 'chat message' in server
        socket.on('chat message', (msg, codi) => {
          console.log(partides);
          // console.log('message of '+socket.id+': '+msg);
          // send var msg value call event websocket 'chat message' in client
          io.to(partides[codi].id).emit('chat message', msg, socket.name);
        });

        socket.on("joinroom",function(data) {
          if(partides[data.codi] == undefined){
            socket.emit('error name' , 'El codi de partida no existeix!', 'roomjoin');
          }else if (data.codi == '' || data.codi == ' ') {
            socket.emit('error name' , 'El numero de la Sala es obligatori', 'roomjoin');
          }else {
            socket.join(data.codi);
            socket.codi = data.codi;
            // console.log(socket);
            partides[data.codi].jugadors.push([socket.id,socket.name])
            io.to(data.codi).emit('jugadors', {jugadors: partides[data.codi].jugadors});
            io.to(socket.id).emit('partida', {partida: partides[data.codi]});
            
            socket.emit('changetoscreen', data.button);
          }

        });
        
        socket.on("createroom",function(data){
          if (data.nom == '' || data.nom == ' ') {
            socket.emit('error name' , 'El nom de la Sala es obligatori', 'roomcreate');
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
            // console.log(partides[codiTaula]);
            // console.log(partides);
            //io.emit('getid', {id: socket.id});
            io.to(socket.id).emit('partida', {partida: partides[codiTaula]});
            io.to(socket.id).emit('jugadors', {jugadors: partida.jugadors});

            // console.log(partides);

            socket.emit('changetoscreen', data.button);
          }
        });

        socket.on("startgame",function(data){
          if(typeof partides[socket.codi] == 'undefined'){
            io.emit('error','No tens permisos per iniciar la partida');
          } else {

            var allowedCards = [];

            // shuffle cards
            for (i=0;i<48;i++)
            {
              posicion1=parseInt(Math.random()*48);
              tmp=cards[i];
              cards[i]=cards[posicion1];
              cards[posicion1]=tmp;
            }

          var quo = Math.floor(48/partides[socket.codi].jugadors.length);

          partides[socket.codi]['CenterCards'] = [];
          partides[socket.codi].CenterCards['or'] = [];
          partides[socket.codi].CenterCards['copes'] = [];
          partides[socket.codi].CenterCards['bastos'] = [];
          partides[socket.codi].CenterCards['espasa'] = [];

          checkCenterCards('o', partides[socket.codi].CenterCards.or, allowedCards, quo);
          checkCenterCards('c', partides[socket.codi].CenterCards.copes, allowedCards, quo);
          checkCenterCards('b', partides[socket.codi].CenterCards.bastos, allowedCards, quo);
          checkCenterCards('e', partides[socket.codi].CenterCards.espasa, allowedCards, quo);

          // Assign cards to players
          for(i=0;i<partides[socket.codi].jugadors.length;i++){
            console.log('cards');
            partides[socket.codi].jugadors[i].cards = [];

            for (let y = 0; y < quo; y++) {
              partides[socket.codi].jugadors[i].cards.push(cards[y])
            }

            //send cards to client
            io.to(partides[socket.codi].jugadors[i][0]).emit('initcards', {cards: partides[socket.codi].jugadors[i]})

            console.log(partides[socket.codi].jugadors[i].cards);
          }
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
