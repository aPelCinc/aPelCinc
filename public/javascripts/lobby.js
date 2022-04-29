  //  socket.on('getid', function(data) {
  //   console.log('id='+data.id);
  // });

  socket.on('partida', function(data) {
    console.log('id='+data.partida.id);
    $("#coditaula").text(data.partida.id);
    $("#nomtaula").text(data.partida.nom);
    
  });

  socket.on('jugadors', function(data) {
      $("#playerlist").empty();
    data.jugadors.forEach(element => {
      $("#playerlist").append("<p class='text-center p-2'>·"+element[1]+"</p>");
    });
  });

  $('#startgame').click(function (){
    socket.emit('startgame');
  })
  function leaveroom(){
    socket.emit('leaveroom');
    changetoscreen('inici')
  }

