var socket = io();

// Save input message value and list send messages
let messages = document.querySelectorAll('.messages');
let input = document.querySelectorAll('.input');

input.forEach(function (item) {
    // Call change event
    item.addEventListener('change', function (e) {
        e.preventDefault();
        
        // If input value is correct
        if (item.value) {
            // send input value call event websocket 'chat message' in server
            let codi = $("#coditaula").text();
            socket.emit('chat message', item.value, codi);
            // restart input value
            item.value = '';
        }
    });
});

// Defined a event websocket 'chat message' in client
socket.on('chat message', function (msg, name) {
    messages.forEach(function (item) {
        // add item in list messages
        if (item.innerHTML != "") {
            item.innerHTML = item.innerHTML + "\n" + msg + " - " + name;
        } else {
            item.innerHTML = msg + " - " + name;
        }
        // let itemChat = document.createElement('li');
        // itemChat.innerText = msg;
        // item.appendChild(itemChat);
        // modify scroll
        // window.scrollTo(0, document.body.scrollHeight);
    });
});
