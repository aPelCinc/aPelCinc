
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'tablegame',
    "render.transparent": true,
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
    this.load.image('b1', 'images/cartes/b1.png');
    this.load.image('b2', 'images/cartes/b2.png');
    this.load.image('b3', 'images/cartes/b3.png');
    this.load.image('b4', 'images/cartes/b4.png');
    this.load.image('b5', 'images/cartes/b5.png');
    this.load.image('b6', 'images/cartes/b6.png');
    this.load.image('b7', 'images/cartes/b7.png');
    this.load.image('b8', 'images/cartes/b8.png');
    this.load.image('b9', 'images/cartes/b9.png');
    this.load.image('b10', 'images/cartes/b10.png');
    this.load.image('b11', 'images/cartes/b11.png');
    this.load.image('b12', 'images/cartes/b12.png');

    this.load.image('c1', 'images/cartes/c1.png');
    this.load.image('c2', 'images/cartes/c2.png');
    this.load.image('c3', 'images/cartes/c3.png');
    this.load.image('c4', 'images/cartes/c4.png');
    this.load.image('c5', 'images/cartes/c5.png');
    this.load.image('c6', 'images/cartes/c6.png');
    this.load.image('c7', 'images/cartes/c7.png');
    this.load.image('c8', 'images/cartes/c8.png');
    this.load.image('c9', 'images/cartes/c9.png');
    this.load.image('c10', 'images/cartes/c10.png');
    this.load.image('c11', 'images/cartes/c11.png');
    this.load.image('c12', 'images/cartes/c12.png');

    this.load.image('o1', 'images/cartes/o1.png');
    this.load.image('o2', 'images/cartes/o2.png');
    this.load.image('o3', 'images/cartes/o3.png');
    this.load.image('o4', 'images/cartes/o4.png');
    this.load.image('o5', 'images/cartes/o5.png');
    this.load.image('o6', 'images/cartes/o6.png');
    this.load.image('o7', 'images/cartes/o7.png');
    this.load.image('o8', 'images/cartes/o8.png');
    this.load.image('o9', 'images/cartes/o9.png');
    this.load.image('o10', 'images/cartes/o10.png');
    this.load.image('o11', 'images/cartes/o11.png');
    this.load.image('o12', 'images/cartes/o12.png');

    this.load.image('e1', 'images/cartes/e1.png');
    this.load.image('e2', 'images/cartes/e2.png');
    this.load.image('e3', 'images/cartes/e3.png');
    this.load.image('e4', 'images/cartes/e4.png');
    this.load.image('e5', 'images/cartes/e5.png');
    this.load.image('e6', 'images/cartes/e6.png');
    this.load.image('e7', 'images/cartes/e7.png');
    this.load.image('e8', 'images/cartes/e8.png');
    this.load.image('e9', 'images/cartes/e9.png');
    this.load.image('e10', 'images/cartes/e10.png');
    this.load.image('e11', 'images/cartes/e11.png');
    this.load.image('e2', 'images/cartes/e12.png');

}

function create ()
{
    this.input.on('pointerup', function () {
        var x = 100;
        var y = 300;

        cartes.forEach(element => {
            phcards = [];

            phcards[element] = this.add.image(x, y, element);
            phcards[element].setScale(0.5);
            phcards[element].setInteractive();
            x = x+20;
        });

    }, this);

}

function update ()
{
}


function repartircartes(cartes){
    console.log('repartir');
    cartes.forEach(element => {
        this.add.image(400, 300, element);
    });
}