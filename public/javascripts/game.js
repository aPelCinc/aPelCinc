var cartes;

socket.on('initcards', function(data) {
    console.log('cartes = '+ data.cards);
    cartes = data.cards;

    
});