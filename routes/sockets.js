let partides = [];
let publicrooms = [];

var allowedCards = [];

var cards = ['o1','o2','o3','o4','o5','o6','o7','o8','o9','o10','o11','o12'];
  cards.push('c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12');
  cards.push('b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12');
  cards.push('e1','e2','e3','e4','e5','e6','e7','e8','e9','e10','e11','e12');

function addCardCenter(codi, card) {
  if (card.startsWith('o')) {
    partides[codi].CenterCards.or.push(card)
  } else if (card.startsWith('c')) {
    partides[codi].CenterCards.copes.push(card)
  } else if (card.startsWith('b')) {
    partides[codi].CenterCards.bastos.push(card)
  } else if (card.startsWith('e')) {
    partides[codi].CenterCards.espasa.push(card)
  }
}

function isThrowCard(card) {
  let comptador = 0;
  allowedCards.forEach((item) => {
    if (card == item) {
      comptador++;
    }
  });

  if (comptador > 0) {
    return true;
  } else {
    return false;
  }
}

function checkCenterCards(typeCard, arrayCenterCards, quo) {
  // Sort array in string
  arrayCenterCards.sort();

  // If center card array length is equals to 0
  if (arrayCenterCards.length == 0) {
    // Only allowed 5, and type card concat
    allowedCards.push(typeCard+'5');

  // If center card array length is equals to 1 and start with 5
  } else if (arrayCenterCards.length == 1 && arrayCenterCards[0].endsWith('5')) {
    // Only allowed 4 or 6, and type card concat
    allowedCards.push(typeCard+'4');
    allowedCards.push(typeCard+'6');

  // If center card array length is greater that 1
  } else if (arrayCenterCards.length > 1) {
    // Create a copy of center card array
    var arrayCenterCardsCopy = [];

    // running center card array
    for (let i = 0; i < arrayCenterCards.length; i++) {
      // save in copy of center card array, value substring (the char 0 to final char) of the center card array
      arrayCenterCardsCopy[i] = parseInt(arrayCenterCards[i].substring(1,arrayCenterCards[i].length));
    }

    // Sort array in integer
    arrayCenterCardsCopy.sort(function(a, b){return a - b});

    // Get a min and max to copy of center card array
    var min = arrayCenterCardsCopy[0];
    var max = arrayCenterCardsCopy[arrayCenterCardsCopy.length-1];

    // If min is greater that 1
    if (min > 1) {
      // Only allowed min less 1, and type card concat
      allowedCards.push(typeCard+(min-1));
    }
    // If max is minor that variable quo
    if (max < quo) {
      // Only allowed max more 1, and type card concat
      allowedCards.push(typeCard+(max+1));
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
            socket.emit('error' , 'El nom del Jugador es obligatori', 'player');
          } else {
            socket.name = data.nom;
            socket.emit('changetoscreen', data.button);
          }
        });

        socket.on("publicroom",function(data){         
          var rooms = [];

          Object.keys(publicrooms).forEach(key => {
            rooms.push(publicrooms[key]);
          });

          socket.emit('getpublicroom', rooms);
        });

        // io.on("create-room", (room) => {
        //   console.log(`room ${room} was created`);
        // });

        // Defined a event websocket 'chat message' in server
        socket.on('chat message', (msg, codi) => {
          // console.log('message of '+socket.id+': '+msg);
          // send var msg value call event websocket 'chat message' in client
          io.to(partides[codi].id).emit('chat message', msg, socket.name);
        });

        socket.on("joinroom",function(data) {
          if(partides[data.codi] == undefined){
            socket.emit('error' , 'El codi de partida no existeix!', 'roomjoin');
          }else if (data.codi == '' || data.codi == ' ') {
            socket.emit('error' , 'El numero de la Sala es obligatori', 'roomjoin');
          }else {
            socket.join(data.codi);
            socket.codi = data.codi;

            if(partides[socket.codi].jugadors.length >= 4){
              socket.emit('error' , 'La sala esta completa!', 'roomjoin');
              console.log('completa')
            } else{

            partides[data.codi].jugadors.push([socket.id,socket.name])
            io.to(data.codi).emit('jugadors', {jugadors: partides[data.codi].jugadors});
            io.to(socket.id).emit('partida', {partida: partides[data.codi]});
            publicrooms[data.codi][2]++;
            
            io.to(socket.codi).emit('chat message', 'Un '+socket.name+' salvatje ha aparegut.', socket.name);
            socket.emit('changetoscreen', data.button);
          } 
        }
        });
        
        socket.on("createroom",function(data){
          if (data.nom == '' || data.nom == ' ') {
            socket.emit('error' , 'El nom de la Sala es obligatori', 'roomcreate');
          } else {
            let codiTaula = socket.id.substring(1,5);
            socket.codi = codiTaula;
            socket.join(codiTaula);
            console.log(socket.codi);
            partida = data;
            partida.id = codiTaula;
            partida.admin = socket.id;
            partida.public= data.public;
            partida.jugadors = [[socket.id,socket.name]];
            //partida.jugadors.push("jugador2");
            partides[codiTaula] = partida;
            

            console.log("room created id: "+ socket.id);
            // console.log(partides[codiTaula]);
            // console.log(partides);
            //io.emit('getid', {id: socket.id});
            io.to(socket.id).emit('partida', {partida: partides[codiTaula]});
            io.to(socket.id).emit('jugadors', {jugadors: partida.jugadors});
            console.log(data.public)
            if(data.public){
              publicrooms[codiTaula] = [codiTaula,partida.nom,1];
            }

            // console.log(partides);

            io.to(socket.codi).emit('chat message', socket.name+' ha creat la partida '+data.nom+'.', socket.name);
            socket.emit('changetoscreen', data.button);

          }
        });

        socket.on("startgame",function(data){
          if(partides[socket.codi].jugadors.length == 1 ){
            io.emit('error','No hay suficientes jugadores');
          } else{
          if(partides[socket.codi].jugadors[0][0] != socket.id){
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

          // Get a max number of cards of each player
          var quo = Math.floor(48/partides[socket.codi].jugadors.length);

          // Declare empty arrays
          partides[socket.codi].CenterCards = [];
          partides[socket.codi].CenterCards.or = [];
          partides[socket.codi].CenterCards.copes = [];
          partides[socket.codi].CenterCards.bastos = [];
          partides[socket.codi].CenterCards.espasa = [];

          // Execute a function check center cards
          checkCenterCards('o', partides[socket.codi].CenterCards.or, quo);
          checkCenterCards('c', partides[socket.codi].CenterCards.copes, quo);
          checkCenterCards('b', partides[socket.codi].CenterCards.bastos, quo);
          checkCenterCards('e', partides[socket.codi].CenterCards.espasa, quo);

          // Assign cards to players
          var numcard = 0;
          for(i=0;i<partides[socket.codi].jugadors.length;i++){
            partides[socket.codi].jugadors[i].cards = [];
            

            for (let y = 0; y < quo; y++) {
              partides[socket.codi].jugadors[i].cards.push(cards[numcard])
              numcard++;
            }

            //send cards to client

            io.to(partides[socket.codi].jugadors[i][0]).emit('initcards', {cards: partides[socket.codi].jugadors[i].cards,
              jugadors: partides[socket.codi].jugadors,
              allowedCards: allowedCards, 
              CenterCardsOr: partides[socket.codi].CenterCards.or, 
              CenterCardsEspasa: partides[socket.codi].CenterCards.espasa, 
              CenterCardsCopes: partides[socket.codi].CenterCards.copes, 
              CenterCardsBastos: partides[socket.codi].CenterCards.bastos, 
            });
          }
          // console.log(partides[socket.codi]);
          partides[socket.codi].torn=0;

        io.to(partides[socket.codi].jugadors[partides[socket.codi].torn][0]).emit('turnfrontend');
         startcounter();
          }
         io.to(socket.codi).emit('counterfrontend');
         delete publicrooms[socket.codi];
        }
        });

        
        function turnover(){
          clearInterval(partides[socket.codi].contador);
          io.to(socket.codi).emit('chat message',partides[socket.codi].jugadors[partides[socket.codi].torn][1]+' ha esgotat el seu torn','sistema');
          nextturn();
          startcounter();
        }
        
        function startcounter(){
          partides[socket.codi].contador = setInterval(turnover, 60000);
        }
        
        function nextturn(){
          if(partides[socket.codi].torn<partides[socket.codi].jugadors.length-1){
            partides[socket.codi].torn ++;
          } else {
            partides[socket.codi].torn = 0;
          }
          io.to(partides[socket.codi].jugadors[partides[socket.codi].torn][0]).emit('turnfrontend');
          io.to(socket.codi).emit('chat message','torn de '+partides[socket.codi].jugadors[partides[socket.codi].torn][1],'sistema');
          io.to(socket.codi).emit('counterfrontend');
        }



        socket.on("turn",function(card){
          if(partides[socket.codi].jugadors[partides[socket.codi].torn][0]!= socket.id){
            socket.emit('error','No es el teu torn');
          } else {
            if (isThrowCard(card)) {
              io.to(socket.codi).emit('chat message','jugo la carta '+card, partides[socket.codi].jugadors[partides[socket.codi].torn][1]);
              console.log(' array: '+partides[socket.codi].jugadors[partides[socket.codi].torn].cards);

              var pos = -1;
              for (let i = 0; i < partides[socket.codi].jugadors[partides[socket.codi].torn].cards.length; i++) {
                if(partides[socket.codi].jugadors[partides[socket.codi].torn].cards[i]==card){
                  pos=i;
                  break;
                }
              }

              partides[socket.codi].jugadors[partides[socket.codi].torn].cards.splice(pos,1);
              console.log(' array: '+partides[socket.codi].jugadors[partides[socket.codi].torn].cards);
              console.log('carta eliminada: '+card);
              socket.emit('initcards', {cards: partides[socket.codi].jugadors[partides[socket.codi].torn].cards,
                jugadors: partides[socket.codi].jugadors, 
                allowedCards: allowedCards});

              addCardCenter(socket.codi, card);

              // Get a max number of cards of each player              
              var quo = Math.floor(48/partides[socket.codi].jugadors.length);

              if(partides[socket.codi].torn<partides[socket.codi].jugadors.length-1){
                partides[socket.codi].torn ++;
              } else {
                partides[socket.codi].torn = 0;
              }

              clearInterval(partides[socket.codi].contador);
              nextturn();
              startcounter();

              io.to(socket.codi).emit('chat message','torn de '+partides[socket.codi].jugadors[partides[socket.codi].torn][1],'sistema');
            } else {
              console.log('En Aquests Moments no pots fer cap Moviment. :-(');
            }
  
          }
          console.log(allowedCards);
          console.log(partides[socket.codi].CenterCards);

          delete allowedCards;

          // Execute a function check center cards
          checkCenterCards('o', partides[socket.codi].CenterCards.or, quo);
          checkCenterCards('c', partides[socket.codi].CenterCards.copes, quo);
          checkCenterCards('b', partides[socket.codi].CenterCards.bastos, quo);
          checkCenterCards('e', partides[socket.codi].CenterCards.espasa, quo);

          // Refresh Cards before turn
          for(i=0;i<partides[socket.codi].jugadors.length;i++){
            //send cards to client
            io.to(partides[socket.codi].jugadors[i][0]).emit('initcards', {cards: partides[socket.codi].jugadors[i].cards,
              jugadors: partides[socket.codi].jugadors,
              allowedCards: allowedCards, 
              CenterCardsOr: partides[socket.codi].CenterCards.or, 
              CenterCardsEspasa: partides[socket.codi].CenterCards.espasa, 
              CenterCardsCopes: partides[socket.codi].CenterCards.copes, 
              CenterCardsBastos: partides[socket.codi].CenterCards.bastos, 
            });
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
              publicrooms[socket.codi][2]--;
              console.log("Room updated")
            }else {
              delete partides[socket.codi];
              delete publicrooms[socket.codi];
              socket.leave(socket.codi);
              console.log(partides);
            }
          }
        });

        socket.on('disconnect', () => {

          if(typeof socket.codi !== 'undefined'){
            if(partides[socket.codi] && partides[socket.codi].jugadors.length !== 1){
              for (let y = 0; y < partides[socket.codi].jugadors.length; y++){
                if(socket.id == partides[socket.codi].jugadors[y][0]){
                 partides[socket.codi].jugadors.splice(y,1);
                }
              }
              io.to(socket.codi).emit('jugadors', {jugadors: partides[socket.codi].jugadors});
              publicrooms[socket.codi][2]--;
              console.log("Room updated");
            } else {
              delete partides[socket.codi];
              console.log("Room removed");
              delete publicrooms[socket.codi];
            }
          }
          console.log('user disconnected');
          console.log(partides[socket.codi]);
        });
      });



      return io;
}

module.exports = controller;
