import Phaser from 'phaser/dist/phaser.min.js'
import PlayField from './play_field.js'
import Controls from './controls.js'

import DevTile from 'Assets/textures/dev-tile.png'
import PlayerImage from 'Assets/textures/player.png'

const DEFAULT_TILE = 'dev-tile'
const PLAYER_TEXTURE = 'player-texture'

export default class Level extends Phaser.Scene {
  preload () {
    this.load.image(DEFAULT_TILE, DevTile)
    this.load.image(PLAYER_TEXTURE, PlayerImage)
    this._playField = new PlayField(20, 20, { x: 40, y: 60 }, 24, 24)
  }

  create () {
    this.add.text(20, 20, 'This is where the magic will happen, baby')

    const gridCoordinates = this._playField.getTileCoordinates()
    for (const coordinate of gridCoordinates) {
      const tile = this.add.image(coordinate.x, coordinate.y, DEFAULT_TILE)
      tile.setOrigin(0, 0)
    }
    this.player = this.add.image(gridCoordinates[22].x, gridCoordinates[22].y, PLAYER_TEXTURE)
    this.player.setOrigin(0, 0)

    const keys = this.input.keyboard.addKeys('W,A,S,D')
    this.controls = new Controls(keys)
    this.lastMoveTime = 0
  }

  update (time, delta) {
    if (this.controls.isDownPressed() && time - this.lastMoveTime > 400) {
      this.player.setY(this.player.y + 24)
      this.lastMoveTime = time
    } else if (this.controls.isUpPressed() && time - this.lastMoveTime > 400) {
      this.player.setY(this.player.y - 24)
      this.lastMoveTime = time
    } else if (this.controls.isLeftPressed() && time - this.lastMoveTime > 400) {
      this.player.setX(this.player.x - 24)
      this.lastMoveTime = time
    } else if (this.controls.isRightPressed() && time - this.lastMoveTime > 400) {
      this.player.setX(this.player.x + 24)
      this.lastMoveTime = time
    }
  }
}
