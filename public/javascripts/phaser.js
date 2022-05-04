
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
    this.load.spritesheet('b1', 'images/cartes/b1.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b2', 'images/cartes/b2.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b3', 'images/cartes/b3.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b4', 'images/cartes/b4.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b5', 'images/cartes/b5.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b6', 'images/cartes/b6.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b7', 'images/cartes/b7.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b8', 'images/cartes/b8.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b9', 'images/cartes/b9.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b10', 'images/cartes/b10.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b11', 'images/cartes/b11.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('b12', 'images/cartes/b12.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c1', 'images/cartes/c1.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c2', 'images/cartes/c2.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c3', 'images/cartes/c3.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c4', 'images/cartes/c4.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c5', 'images/cartes/c5.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c6', 'images/cartes/c6.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c7', 'images/cartes/c7.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c8', 'images/cartes/c8.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c9', 'images/cartes/c9.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c10', 'images/cartes/c10.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c11', 'images/cartes/c11.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('c12', 'images/cartes/c12.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o1', 'images/cartes/o1.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o2', 'images/cartes/o2.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o3', 'images/cartes/o3.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o4', 'images/cartes/o4.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o5', 'images/cartes/o5.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o6', 'images/cartes/o6.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o7', 'images/cartes/o7.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o8', 'images/cartes/o8.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o9', 'images/cartes/o9.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o10', 'images/cartes/o10.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o11', 'images/cartes/o11.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('o12', 'images/cartes/o12.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e1', 'images/cartes/e1.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e2', 'images/cartes/e2.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e3', 'images/cartes/e3.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e4', 'images/cartes/e4.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e5', 'images/cartes/e5.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e6', 'images/cartes/e6.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e7', 'images/cartes/e7.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e8', 'images/cartes/e8.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e9', 'images/cartes/e9.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e10', 'images/cartes/e10.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e11', 'images/cartes/e11.png',{frameWidth: 208,frameHeight: 319 });
    this.load.spritesheet('e2', 'images/cartes/e12.png',{frameWidth: 208,frameHeight: 319 });
}


function create ()
{
    self = this;
    var phcards = [];
    this.socket = io();
    socket.on('initcards', function(data) {
        changetoscreen('game');
        console.log('cartes1 = '+ data.cards);

        var y = $('#tablegame').height();
        var x = $('#tablegame').width();
        var wtmp = data.cards.length *20 +50
      
        console.log(x + 'cartes: ' + data.cards.length *20 + 'separacio: '+(x - wtmp)/2);
        var x = (x - wtmp)/2;
      
        var y = y - 200;

        
        data.cards.forEach(element => {
            card = self.add.sprite(x, y, element).setInteractive();
            card.setScale(0.5);
            phcards[element] = card;
    
            card.on('pointerover', function (event) { 
                phcards[element].y -= 100 

            });
            card.on('pointerout', function (event) { phcards[element].y += 100 });
            card.on('pointerdown', selectedcard); // Start game on click.

        

            
            
            /*image = self.add.image(x, y, element);
            image.setScale(0.5);
            image.setInteractive();*/

            

            x = x+20;
        });
        console.log(phcards);
    });
}

function selectedcard ()
{
    console.log('carta seleccionada');
}
function update ()
{
}
