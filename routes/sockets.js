// Create games array, public rooms array, allowed cards array and array of cards
let partides = [];
let publicrooms = [];
var allowedCards = [];
var cards = ['o1', 'o2', 'o3', 'o4', 'o5', 'o6', 'o7', 'o8', 'o9', 'o10', 'o11', 'o12',
  'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12',
  'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9', 'b10', 'b11', 'b12',
  'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e12'];

/**
 * getQuo: Get a max number of cards of each player
 * 
 * @returns max number of cards of each player
 * **/
function getQuo(codi) {
  return Math.floor(48 / partides[codi].jugadors.length);
}

/**
 * addCardCenter: add card in center of table
 * 
 * @param codi integer value is the code of room
 * @param card throw card
 * **/
function addCardCenter(codi, card) {
  // select a type card, if save card in the correct array
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

/**
 * isThrowCard: checked allowed card array, if throw card it is on allowed card array 
 * 
 * @param codi integer value is the code of room
 * @param card throw card
 * @returns true or false, if throw card it is on allowed card array
 * **/
function isThrowCard(card) {
  let comptador = 0;
  // each allowed card array
  allowedCards.forEach((item) => {
    // If card selected is equals to item, increment counter
    if (card == item) {
      comptador++;
    }
  });

  // If counter is greather 0, return true, if not return false
  if (comptador > 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * checkCenterCards: checked center cards array, and does the push to allowed cards array 
 * 
 * @param typeCard type of card
 * @param arrayCenterCards center cards array
 * @param quo number of cards of each player
 * **/
function checkCenterCards(typeCard, arrayCenterCards, quo) {
  // Sort array in string
  arrayCenterCards.sort();

  // If center card array length is equals to 0
  if (arrayCenterCards.length == 0) {
    // Only allowed 5, and type card concat
    allowedCards.push(typeCard + '5');

    // If center card array length is equals to 1 and start with 5
  } else if (arrayCenterCards.length == 1 && arrayCenterCards[0].endsWith('5')) {
    // Only allowed 4 or 6, and type card concat
    allowedCards.push(typeCard + '4');
    allowedCards.push(typeCard + '6');

    // If center card array length is greater that 1
  } else if (arrayCenterCards.length > 1) {
    // Create a copy of center card array
    var arrayCenterCardsCopy = [];

    // running center card array
    for (let i = 0; i < arrayCenterCards.length; i++) {
      // save in copy of center card array, value substring (the char 0 to final char) of the center card array
      arrayCenterCardsCopy[i] = parseInt(arrayCenterCards[i].substring(1, arrayCenterCards[i].length));
    }

    // Sort array in integer
    arrayCenterCardsCopy.sort(function (a, b) { return a - b });

    // Get a min and max to copy of center card array
    var min = arrayCenterCardsCopy[0];
    var max = arrayCenterCardsCopy[arrayCenterCardsCopy.length - 1];

    // If min is greater that 1
    if (min > 1) {
      // Only allowed min less 1, and type card concat
      allowedCards.push(typeCard + (min - 1));
    }

    // If max is minor that variable quo
    if (max < quo) {
      // Only allowed max more 1, and type card concat
      allowedCards.push(typeCard + (max + 1));
    }
  }
}

/**
 * startcounter: start counter
 * **/
function startcounter(io, codi) {
  // If else, start set interval turn over 60000 ms
  ////console.log("startcounter")
  ////console.log(partides[codi].contador)
  partides[codi].contador = setInterval(comparator, 20000, io, codi);
  ////console.log(partides[codi].contador)
}
function comparator(io, codi) {
  ////console.log("compare");
      ////console.log(partides[codi].contador)
      var compare;
      compare = partides[codi].jugadors[partides[codi].torn].cards.filter(element => allowedCards.includes(element)).length;
      console.log(partides[codi].jugadors[partides[codi].torn][1])
      console.log(allowedCards)
      console.log(compare)
      if (compare == 0) {
        console.log("manual")
        startcounter(io, codi);
        turnover(io, codi);
      }
}
/**
 * nextturn: next turn
 * **/
function nextturn(io, codi) {
      if (partides[codi].torn < partides[codi].jugadors.length - 1) {
        partides[codi].torn++;
      } else {
        partides[codi].torn = 0;
      }
      io.to(partides[codi].jugadors[partides[codi].torn][0]).emit('turnfrontend');
      io.to(codi).emit('chat message', 'torn de ' + partides[codi].jugadors[partides[codi].torn][1], 'sistema');
      io.to(codi).emit('counterfrontend');
}
/**
 * turnover: player turn over
 * **/
function turnover(io, codi) {
  //console.log("turnover")
  //console.log(partides[codi].contador)
  if (partides[codi] !== undefined) {
    //console.log("turnover in")
    //console.log(partides[codi].contador)
    clearInterval(partides[codi].contador);
    io.to(codi).emit('chat message', partides[codi].jugadors[partides[codi].torn][1] + ' ha esgotat el seu torn', 'sistema');
    nextturn(io, codi);
    // startcounter();
  }
}

/**
 * controller: Controller the Web Sockets 
 * 
 * @param io web global socket
 * **/
function controller(io) {
  // io is a web global socket
  // socket is a web local socket

  // Defined a event websocket 'connection' in server
  io.on('connection', (socket) => {

    // Defined a event websocket 'chat message' in server
    socket.on('chat message', (msg, codi) => {
      // send var msg value call event websocket 'chat message' in client
      io.to(partides[codi].id).emit('chat message', msg, socket.name);
    });

    // Defined a event websocket 'name' in server, is checked name correctly
    socket.on("name", function (data) {
      // Checked name player
      if (data.nom == '' || data.nom == ' ') {
        socket.emit('error', 'El nom del Jugador es obligatori', 'player');
      } else {
        socket.name = data.nom;
        socket.emit('changetoscreen', data.button);
      }
    });

    // Defined a event websocket 'publicroom' in server, Get a exists rooms and return to client
    socket.on("publicroom", function (data) {
      var rooms = [];

      // Get a code of public rooms
      Object.keys(publicrooms).forEach(key => {
        rooms.push(publicrooms[key]);
      });

      socket.emit('getpublicroom', rooms);
    });

    // Defined a event websocket 'joinroom' in server
    socket.on("joinroom", function (data) {
      if (partides[data.codi] == undefined) {
        socket.emit('error', 'El codi de partida no existeix!', 'roomjoin');
      } else if (data.codi == '' || data.codi == ' ') {
        socket.emit('error', 'El numero de la Sala es obligatori', 'roomjoin');
      } else {
        socket.join(data.codi);
        socket.codi = data.codi;

        // If room is not complete
        if (partides[socket.codi].jugadors.length >= 4) {
          socket.emit('error', 'La sala esta completa!', 'roomjoin');
        } else {
          // player join to room
          partides[data.codi].jugadors.push([socket.id, socket.name])
          io.to(data.codi).emit('jugadors', { jugadors: partides[data.codi].jugadors });
          io.to(socket.id).emit('partida', { partida: partides[data.codi] });

          if (publicrooms[data.codi] !== undefined) {
            publicrooms[data.codi][2]++;
          }

          io.to(socket.codi).emit('chat message', 'Un ' + socket.name + ' salvatje ha aparegut.', 'sistema');
          socket.emit('changetoscreen', data.button);
        }
      }
    });

    // Defined a event websocket 'createroom' in server
    socket.on("createroom", function (data) {
      if (data.nom == '' || data.nom == ' ') {
        socket.emit('error', 'El nom de la Sala es obligatori', 'roomcreate');
      } else {
        // create a new room and join to admin of room
        let codiTaula = socket.id.substring(1, 5);
        socket.join(codiTaula);
        socket.codi = codiTaula;
        partida = data;
        partida.id = codiTaula;
        partida.admin = socket.id;
        partida.public = data.public;
        partida.jugadors = [[socket.id, socket.name]];
        partides[codiTaula] = partida;

        io.to(socket.id).emit('partida', { partida: partides[codiTaula] });
        io.to(socket.id).emit('jugadors', { jugadors: partida.jugadors });

        // If room is public, save room in rooms public array
        if (data.public) {
          publicrooms[codiTaula] = [codiTaula, partida.nom, 1];
        }

        io.to(socket.codi).emit('chat message', socket.name + ' ha creat la partida ' + data.nom + '.', socket.name);
        socket.emit('changetoscreen', data.button);
      }
    });

    // Defined a event websocket 'startgame' in server
    socket.on("startgame", function (data) {
      if (partides[socket.codi].jugadors.length == 1) {
        socket.emit('error', 'No hay suficientes jugadores');
      } else {
        if (partides[socket.codi].jugadors[0][0] != socket.id) {
          socket.emit('error', 'No tens permisos per iniciar la partida');
        } else {
          // shuffle cards
          for (i = 0; i < 48; i++) {
            posicion1 = parseInt(Math.random() * 48);
            tmp = cards[i];
            cards[i] = cards[posicion1];
            cards[posicion1] = tmp;
          }

          // Declare empty arrays
          partides[socket.codi].CenterCards = [];
          partides[socket.codi].CenterCards.or = [];
          partides[socket.codi].CenterCards.copes = [];
          partides[socket.codi].CenterCards.bastos = [];
          partides[socket.codi].CenterCards.espasa = [];

          // Allow Only o5 card
          allowedCards.push('o5');

          // Assign cards to players
          var numcard = 0;
          for (i = 0; i < partides[socket.codi].jugadors.length; i++) {
            partides[socket.codi].jugadors[i].cards = [];

            for (let y = 0; y < getQuo(socket.codi); y++) {
              partides[socket.codi].jugadors[i].cards.push(cards[numcard])
              numcard++;
              if (cards[numcard] == "o5") {
                //defines the player who has 5 gold card
                partides[socket.codi].torn = i;
              }
            }
            partides[socket.codi].contador = [];
            startcounter(io, socket.codi);
            // sort card of each player
            partides[socket.codi].jugadors[i].cards.sort()

            //send cards to client
            io.to(partides[socket.codi].jugadors[i][0]).emit('initcards', {
              cards: partides[socket.codi].jugadors[i].cards,
              jugadors: partides[socket.codi].jugadors,
              num: i,
              allowedCards: allowedCards,
              CenterCardsOr: partides[socket.codi].CenterCards.or,
              CenterCardsEspasa: partides[socket.codi].CenterCards.espasa,
              CenterCardsCopes: partides[socket.codi].CenterCards.copes,
              CenterCardsBastos: partides[socket.codi].CenterCards.bastos,
            });
          }

          io.to(partides[socket.codi].jugadors[partides[socket.codi].torn][0]).emit('turnfrontend');
        }
        io.to(socket.codi).emit('counterfrontend');
        delete publicrooms[socket.codi];
      }
    
    });

    socket.on("turn", function (card) {
      //console.log("Turn")
      ////console.log(socket.codi)
      ////console.log(partides[socket.codi])
      if (partides[socket.codi].jugadors[partides[socket.codi].torn][0] != socket.id) {
        socket.emit('error', 'No es el teu torn');
      } else {
        if (isThrowCard(card)) {
          io.to(socket.codi).emit('chat message', 'jugo la carta ' + card, partides[socket.codi].jugadors[partides[socket.codi].torn][1]);

          var pos = -1;
          for (let i = 0; i < partides[socket.codi].jugadors[partides[socket.codi].torn].cards.length; i++) {
            if (partides[socket.codi].jugadors[partides[socket.codi].torn].cards[i] == card) {
              pos = i;
              break;
            }
          }

          partides[socket.codi].jugadors[partides[socket.codi].torn].cards.splice(pos, 1);
          partides[socket.codi].lastcard = card;
          socket.emit('initcards', {
            cards: partides[socket.codi].jugadors[partides[socket.codi].torn].cards,
            jugadors: partides[socket.codi].jugadors,
            allowedCards: allowedCards
          });

          addCardCenter(socket.codi, card);

          if (partides[socket.codi] !== undefined) {
            clearInterval(partides[socket.codi].contador);
          }
          ////console.log(partides[codi].contador)
          startcounter(io, socket.codi);
          turnover(io, socket.codi);
          io.to(socket.codi).emit('chat message', 'torn de ' + partides[socket.codi].jugadors[partides[socket.codi].torn][1], 'sistema');

          allowedCards = [];

          // Execute a function check center cards
          checkCenterCards('o', partides[socket.codi].CenterCards.or, getQuo(socket.codi));
          checkCenterCards('c', partides[socket.codi].CenterCards.copes, getQuo(socket.codi));
          checkCenterCards('b', partides[socket.codi].CenterCards.bastos, getQuo(socket.codi));
          checkCenterCards('e', partides[socket.codi].CenterCards.espasa, getQuo(socket.codi));

          // Refresh Cards before turn
          for (i = 0; i < partides[socket.codi].jugadors.length; i++) {
            //send cards to client
            io.to(partides[socket.codi].jugadors[i][0]).emit('initcards', {
              type: card.charAt(0),
              cardtoadd: partides[socket.codi].lastcard,
              cards: partides[socket.codi].jugadors[i].cards,
              jugadors: partides[socket.codi].jugadors,
              allowedCards: allowedCards,
              CenterCardsOr: partides[socket.codi].CenterCards.or,
              CenterCardsEspasa: partides[socket.codi].CenterCards.espasa,
              CenterCardsCopes: partides[socket.codi].CenterCards.copes,
              CenterCardsBastos: partides[socket.codi].CenterCards.bastos,
            });
          }
        } else {
          socket.emit('error', 'En Aquest Moment no pots tirar aquesta carta. :-(');
        }
      }
    });

    // Defined a event websocket 'scoreserver' in server
    socket.on("scoreserver", function (data) {
      var num = [];
      var finalGame = false;
      var winner = [];

      // checked the winner player of the game
      for (var i = 0; i < partides[socket.codi].jugadors.length; i++) {
        if (partides[socket.codi].jugadors[i].cards.length > 0) {
          num[i] = partides[socket.codi].jugadors[i].cards.length;
          finalGame = false;
        } else {
          winner = partides[socket.codi].jugadors[i];
          finalGame = true;
          break;
        }
      }

      // If final game is true, game final and return winner to client
      if (finalGame) {
        io.to(socket.codi).emit('finalGame', {
          winner: winner
        });
      } else {
        partides[socket.codi].jugadors[1].num = i + 1;
        io.to(socket.codi).emit('scoreclient', {
          num1: num[0], num2: num[1], num3: num[2], num4: num[3], totalplayers: partides[socket.codi].jugadors.length
        });
      }
    });

    socket.on("nameplayerfrontendd", function (data) {
      var name = partides[socket.codi].jugadors;
      for(var i =0; i<partides[socket.codi].jugadors;i++) {
        name[i]=partides[socket.codi].jugadors[i]
      }
      io.to(socket.codi).emit('nameplayerfrontend', {
        name1: name[0], name2: name[1], name3: name[2], name4: name[3], totalplayers: partides[socket.codi].jugadors.length
      });
    });
    
    // Defined a event websocket 'leaveroom' in server
    socket.on("leaveroom", function (data) {
      if (typeof socket.codi !== 'undefined') {
        // remove players of the game
        if (partides[socket.codi] !== undefined && partides[socket.codi].jugadors.length !== 1) {
          for (let y = 0; y < partides[socket.codi].jugadors.length; y++) {
            if (socket.id == partides[socket.codi].jugadors[y][0]) {
              partides[socket.codi].jugadors.splice(y, 1);
            }
          }

          if (partides[socket.codi].admin == socket.id) {
            io.to(socket.codi).emit('closeroom');
          }

          io.to(socket.codi).emit('jugadors', { jugadors: partides[socket.codi].jugadors });
          socket.leave(socket.codi);

          if (publicrooms[socket.codi] !== undefined) {
            publicrooms[socket.codi][2]--;
          }

        } else {
          delete partides[socket.codi];
          delete publicrooms[socket.codi];
          socket.leave(socket.codi);
        }
      }
    });


    socket.on('compare', () => {
      comparator(io, socket.codi);
    });

    // Defined a event websocket 'disconnect' in server
    socket.on('disconnect', () => {
      if (typeof socket.codi !== 'undefined') {
        if (partides[socket.codi] && partides[socket.codi].jugadors.length !== 1) {
          for (let y = 0; y < partides[socket.codi].jugadors.length; y++) {
            if (socket.id == partides[socket.codi].jugadors[y][0]) {
              partides[socket.codi].jugadors.splice(y, 1);
            }
          }

          if (partides[socket.codi].admin == socket.id) {
            io.to(socket.codi).emit('closeroom');
          }

          if (partides[socket.codi] !== undefined) {
            io.to(socket.codi).emit('jugadors', { jugadors: partides[socket.codi].jugadors });
          }

          if (publicrooms[socket.codi] !== undefined) {
            publicrooms[socket.codi][2]--;
          }
        } else {
          delete partides[socket.codi];
          delete publicrooms[socket.codi];
        }
      }
    });
  });

  return io;
}

module.exports = controller;
