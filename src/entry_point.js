import Phaser from 'phaser/dist/phaser.min.js';

class Example extends Phaser.Scene
{
    preload ()
    { }

    create ()
    {
        this.add.text(100, 100, 'Set Phaser to stun; you\'re good to go!', {fontFamily: 'sans'});
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example,
};

const game = new Phaser.Game(config);

