import Phaser from 'phaser/dist/phaser.min.js';
import sum from './sum.js';

// Assets alias is defined in webpack.config.js
import PixelPhaser from 'Assets/textures/phaser.png';
import Jingle from 'Assets/sounds//music//phaser-jingle.wav';


class Example extends Phaser.Scene
{
    preload ()
    {
      this.load.image('phaser', PixelPhaser);
      this.load.audio('jingle', [Jingle]);
    }

    create ()
    {
        const x = sum(125, 100);
        this.add.text(x, 100, 'Set Phaser to stun; you\'re good to go!', {fontFamily: 'sans'});
        this.add.image(385, 290, 'phaser');
        this.add.text(250, 500, 'No sound? Try clicking the panel.', {fontFamily: 'sans'});
        const music = this.sound.add('jingle');
        music.play();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Example,
};

const game = new Phaser.Game(config);

