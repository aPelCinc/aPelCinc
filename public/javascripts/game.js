
socket.on('partida', function (data) {
  $("#nomtaula2").text(data.partida.nom);
});

socket.on('initcards', function (data) {
});

socket.on('jugadors', function (data) {
  $("#players").empty();
  data.jugadors.forEach(element => {
    $("#players").append("<p class='text-center p-2'>·" + element[1] + "</p>");
  });
});
