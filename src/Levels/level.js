import Phaser from 'phaser/dist/phaser.min.js'
import PlayField from '../play_field.js'
import DevTile from 'Assets/textures/dev-tile.png'

const DEFAULT_TILE = 'dev-tile'

export default class Level extends Phaser.Scene {
  preload () {
    this.load.image(DEFAULT_TILE, DevTile)
    this._playField = new PlayField(20, 20, { x: 40, y: 60 }, 24, 24)
  }

  create () {
    this.add.text(20, 20, 'This is where the magic will happen, baby')

    for (const coordinate of this._playField.getTileCoordinates()) {
      const tile = this.add.image(coordinate.x, coordinate.y, DEFAULT_TILE)
      tile.setOrigin(0, 0)
    }
  }
}
