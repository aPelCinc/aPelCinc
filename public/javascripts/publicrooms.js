console.log('rooms');

$('#roomlistbut').on("click", function(){
    $("#tablelist").empty();
    socket.emit('publicroom');
 });

 socket.on('getpublicroom', function(data) {
    console.log("rooms: "+data);
    data.forEach(element => {
        div="<button onclick=(jointoroom('"+element[0]+"')) class='h-min bg-[#0404044d] rounded-md p-2 flex space-x-16 justify-center'><p>Nom: "+element[1]+"</p><p>"+element[2]+"/4</p></button>";
        $("#tablelist").append(div);
    });
 });

 function jointoroom(id){
   $("#noadmin").removeClass( 'hidden' );
   $("#startgame").addClass( 'hidden' );
    socket.emit('joinroom', {codi: id, button: 'lobby'});
 }
 function refreshtablelist(){
   $("#tablelist").empty();
   socket.emit('publicroom');
 }