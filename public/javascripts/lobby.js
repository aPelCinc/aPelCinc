$("#createroombut").on("click", function(){
    console.log("createroom");
    socket.emit('createroom', {nom: "taula1"});
  });

  socket.on('getid', function(data) {
    console.log('id='+data.id);
    $("#coditaula").text(data.id);
    
  });

  socket.on('jugadors', function(data) {
    data.jugadors.forEach(element => {
      $("#playerlist").empty();
      $("#playerlist").append("<p class='text-center p-2'>·"+element[1]+"</p>");
    });
  });