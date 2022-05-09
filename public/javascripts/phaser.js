var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'tablegame',
    transparent: true,
    callbacks: {
        postBoot: function (game) {
          // In v3.15, you have to override Phaser's default styles
          game.canvas.style.width = '100%';
          game.canvas.style.height = '100%';
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('torn', 'images/torn.png');

    this.load.spritesheet('b1', 'images/cartes/b1.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b2', 'images/cartes/b2.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b3', 'images/cartes/b3.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b4', 'images/cartes/b4.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b5', 'images/cartes/b5.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b6', 'images/cartes/b6.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b7', 'images/cartes/b7.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b8', 'images/cartes/b8.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b9', 'images/cartes/b9.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b10', 'images/cartes/b10.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b11', 'images/cartes/b11.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('b12', 'images/cartes/b12.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c1', 'images/cartes/c1.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c2', 'images/cartes/c2.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c3', 'images/cartes/c3.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c4', 'images/cartes/c4.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c5', 'images/cartes/c5.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c6', 'images/cartes/c6.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c7', 'images/cartes/c7.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c8', 'images/cartes/c8.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c9', 'images/cartes/c9.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c10', 'images/cartes/c10.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c11', 'images/cartes/c11.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('c12', 'images/cartes/c12.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o1', 'images/cartes/o1.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o2', 'images/cartes/o2.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o3', 'images/cartes/o3.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o4', 'images/cartes/o4.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o5', 'images/cartes/o5.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o6', 'images/cartes/o6.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o7', 'images/cartes/o7.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o8', 'images/cartes/o8.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o9', 'images/cartes/o9.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o10', 'images/cartes/o10.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o11', 'images/cartes/o11.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('o12', 'images/cartes/o12.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e1', 'images/cartes/e1.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e2', 'images/cartes/e2.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e3', 'images/cartes/e3.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e4', 'images/cartes/e4.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e5', 'images/cartes/e5.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e6', 'images/cartes/e6.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e7', 'images/cartes/e7.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e8', 'images/cartes/e8.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e9', 'images/cartes/e9.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e10', 'images/cartes/e10.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e11', 'images/cartes/e11.png',{frameWidth: 262,frameHeight: 400 });
    this.load.spritesheet('e12', 'images/cartes/e12.png',{frameWidth: 262,frameHeight: 400 });
}


function create ()
{
    var x = $('#tablegame').width();
    self = this;
    var centercardsor = [];
    var centercardsespasa = [];
    var centercardscopes = [];
    var centercardsbastos = [];
    this.phcards = [];
    var torn = [];
    this.socket = io();

    socket.on('initcards', function(data) {
        
        self.phcards.forEach(element => {
            element.destroy();
        });

        changetoscreen('game');

        console.log(data.CenterCardsOr);
        console.log(data.CenterCardsEspasa);
        console.log(data.CenterCardsCopes);
        console.log(data.CenterCardsBastos);

        var y = $('#tablegame').height();
        var x = $('#tablegame').width();
        var wtmp = data.cards.length *20 +70

        // console.log(x + 'cartes: ' + data.cards.length *20 + 'separacio: '+(x - wtmp)/2);
        // console.log(data.jugadors);
        
        if(data.jugadors.length == 2){
            var x = (x - wtmp)/4;
        }else{
            var x = (x - wtmp)/3;
        }
        
        var y = y - 200;

        for (let i = 0; i < data.cards.length; i++) {
            card = self.add.sprite(x, y, data.cards[i]).setInteractive();
            card.setScale(0.40);
            self.phcards[i] = card;
    
            card.on('pointerover', function (event) { 
                self.phcards[i].y -= 100 

            });
            card.on('pointerout', function (event) { self.phcards[i].y += 100 });
            card.on('pointerdown', function (event) {
                     console.log('carta seleccionada '+ data.cards[i]);
                    socket.emit('turn', data.cards[i]); 
            }); // Start game on click.

            x = x+20;            
        }
        /*data.cards.forEach(element => {
            card = self.add.sprite(x, y, element).setInteractive();
            card.setScale(0.50);
            self.phcards[element] = card;
    
            card.on('pointerover', function (event) { 
                self.phcards[element].y -= 100 

            });
            card.on('pointerout', function (event) { self.phcards[element].y += 100 });
            card.on('pointerdown', function (event) {
                     console.log('carta seleccionada '+ element);
                    socket.emit('turn', element); 
            }); // Start game on click.

            x = x + 20;
        });*/
        // console.log(phcards);

        // Or
        var y = $('#tablegame').height();
        var x = $('#tablegame').width();        
        if (data.jugadors.length == 2){
            var wtmp = data.cards.length *23 +70
        } else if(data.jugadors.length == 3){
            var wtmp = data.cards.length *33 +70
        } else if(data.jugadors.length == 4){
            var wtmp = data.cards.length *46 +70
        }

        var x = (x - wtmp);
        
        var y = y - 510;

        data.CenterCardsOr.forEach(element => {
            card = self.add.sprite(x, y, element).setInteractive();
            card.setScale(0.40);
            centercardsor[element] = card;

            y = y + 20;
        });

        // Copes
        var y = $('#tablegame').height();
        var x = $('#tablegame').width();       
        if (data.jugadors.length == 2){
            var wtmp = data.cards.length *28 +70
        } else if(data.jugadors.length == 3){
            var wtmp = data.cards.length *40 +70
        } else if(data.jugadors.length == 4){
            var wtmp = data.cards.length *55 +70
        }

        var x = (x - wtmp);
        
        var y = y - 510;

        data.CenterCardsCopes.forEach(element => {
            card = self.add.sprite(x, y, element).setInteractive();
            card.setScale(0.40);
            centercardscopes[element] = card;

            y = y + 20;
        });

        // Espasa
        var y = $('#tablegame').height();
        var x = $('#tablegame').width();        
        if (data.jugadors.length == 2){
            var wtmp = data.cards.length *33 +70
        } else if(data.jugadors.length == 3){
            var wtmp = data.cards.length *47 +70
        } else if(data.jugadors.length == 4){
            var wtmp = data.cards.length *64 +70
        }

        var x = (x - wtmp);
        
        var y = y - 510;

        data.CenterCardsEspasa.forEach(element => {
            card = self.add.sprite(x, y, element).setInteractive();
            card.setScale(0.40);
            centercardsespasa[element] = card;

            y = y + 20;
        });

        // Bastos
        var y = $('#tablegame').height();
        var x = $('#tablegame').width();        
        if (data.jugadors.length == 2){
            var wtmp = data.cards.length *38 +70
        } else if(data.jugadors.length == 3){
            var wtmp = data.cards.length *54 +70
        } else if(data.jugadors.length == 4){
            var wtmp = data.cards.length *73 +70
        }

        var x = (x - wtmp);

        var y = y - 510;

        data.CenterCardsBastos.forEach(element => {
            card = self.add.sprite(x, y, element).setInteractive();
            card.setScale(0.40);
            centercardsbastos[element] = card;

            y = y + 20;
        });
    });
    var temporitzador = [];
    temporitzador[0] = 60;

    socket.on('counterfrontend', function(data) {
        try {
            temporitzador[2].destroy();
            clearInterval(temporitzador[1]);
          } catch (error) {
          }
        temporitzador[0] = 58;
        temporitzador[2] = self.add.text(x/1.5, 0, 60).setOrigin( 1,0);
        temporitzador[1] = setInterval(contador, 1000);
    });

    socket.on('turnfrontend', function(data) {
        var y = $('#tablegame').height();
        var x = $('#tablegame').width();

        torn[0] = self.add.graphics();
        torn[0].lineStyle(150, 000000, 1);
        torn[0].beginPath();
        torn[0].moveTo(0, y/3);
        torn[0].lineTo(x, y/3);
        torn[0].closePath();
        torn[0].strokePath();
        
    
        var style = { font: "bold 84px Arial", fill: "#fff", align: "center"};
    
        torn[1] = self.add.text(x/2, y/3, "Es el teu torn", style).setOrigin( 1,0.5);
        torn[1].setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        torn[2] = setInterval(quitturn, 2000);

    });

    function contador(){
        var x = $('#tablegame').width();
        temporitzador[2].destroy();
        temporitzador[2] = self.add.text(x/1.5, 0, temporitzador[0]).setOrigin( 1,0);

        if(temporitzador[0]==0){
            clearInterval(temporitzador[1]);
            temporitzador[2].destroy();
        } else {
            temporitzador[0] --;
        }
    }

    function quitturn(){
        console.log('quit');
        clearInterval(torn[2]);
        torn[0].destroy();
        torn[1].destroy();
    }
}


function update ()
{
}
