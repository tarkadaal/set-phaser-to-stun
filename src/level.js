import Phaser from 'phaser/dist/phaser.min.js'

export default class Level extends Phaser.Scene {
  create () {
    this.add.text(20, 20, 'This is where the magic will happen.')
  }
}
