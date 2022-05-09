console.log('rooms');

socket.emit('publicroom');
socket.on('getpublicroom', function(data) {
    console.log("rooms: "+data);
 });