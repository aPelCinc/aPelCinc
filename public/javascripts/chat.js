
// Save input message value and list send messages
let messages = document.querySelectorAll('.messages');
let input = document.querySelectorAll('.input');
let btnSelectEmoji = document.querySelectorAll('.btnSelectEmoji');

btnSelectEmoji.forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();

        document.getElementById('selectEmoji').classList.toggle('hidden');
    });
});

input.forEach(function (item) {
    // Call click event
    document.querySelector('emoji-picker').addEventListener('emoji-click', event => item.value += event.detail.unicode);
});

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
        let itemChat = document.createElement('li');
        itemChat.innerText = name + ": " + msg;
        item.appendChild(itemChat);
    });
});
