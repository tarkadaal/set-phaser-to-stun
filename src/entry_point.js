import Phaser from 'phaser/dist/phaser.min.js';
import sum from './sum.js';

class Example extends Phaser.Scene
{
    preload ()
    { }

    create ()
    {
        const x = sum(125, 100);
        this.add.text(x, 100, 'Set Phaser to stun; you\'re good to go!', {fontFamily: 'sans'});
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example,
};

const game = new Phaser.Game(config);

