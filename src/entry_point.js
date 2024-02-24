import Phaser from 'phaser/dist/phaser.min.js'
import Level from './level.js'
const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game_drop',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  scene: Level
}

const game = new Phaser.Game(config) // eslint-disable-line no-unused-vars
