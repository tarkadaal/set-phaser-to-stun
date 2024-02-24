import Phaser from 'phaser/dist/phaser.min.js'
import Controls from './controls.js'

export default class Start extends Phaser.Scene {
  constructor () {
    super({ key: 'start' })
  }

  create () {
    this.add.text(20, 20, 'Lightwielder')
    this.add.text(20, 50, 'A game for Indie Dev Jam 3')
    this.add.text(20, 80, 'by @Wanderer93 and @tarkadaal')
    this.add.text(20, 550, 'Press a WASD key to start.')

    const keys = this.input.keyboard.addKeys('W,A,S,D')
    this.controls = new Controls(keys)
  }

  update (time, delta) {
    const anyPressed = this.controls.areAnyPressed()[0]
    if (anyPressed) {
      this.scene.start('level')
    }
  }
}
