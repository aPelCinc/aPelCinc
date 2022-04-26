   socket.on('getid', function(data) {
    console.log('id='+data.id);
  });

  socket.on('getid', function(data) {
    console.log('id='+data.id);
    $("#coditaula").text(data.id);
    
  });

  socket.on('jugadors', function(data) {
      $("#playerlist").empty();
    data.jugadors.forEach(element => {
      $("#playerlist").append("<p class='text-center p-2'>·"+element[1]+"</p>");
    });
  });