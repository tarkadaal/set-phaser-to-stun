import Phaser from 'phaser/dist/phaser.min.js'

import Controls from '../controls.js'

import aTile from 'Assets/textures/tiles.png'
import Map from 'Assets/textures/test.json'
import PlayerImage from 'Assets/textures/player.png'

const PLAYER_TEXTURE = 'player-texture'

export default class SimpleLevel extends Phaser.Scene {
  constructor () {
    super({ key: 'simple_level' })
  }

  preload () {
    this.load.tilemapTiledJSON('map', Map)
    this.load.image('tiles', aTile)
    this.load.image(PLAYER_TEXTURE, PlayerImage)
  }

  create () {
    const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 })
    const tileset = map.addTilesetImage('floating-tileset', 'tiles')
    const layerGround = map.createLayer('ground', tileset, 0, 0)
    const layerWater = map.createLayer('water', tileset, 0, 0)
    const layerHill = map.createLayer('hill', tileset, 0, 0)
    const layerBush = map.createLayer('bush', tileset, 0, 0)

    for (const layer of [layerHill, layerBush, layerWater, layerGround]) {
      layer.setScale(2)
    }

    layerWater.setCollisionByExclusion([-1])
    layerBush.setCollisionByExclusion([-1])

    this.player = this.add.image(32, 32, PLAYER_TEXTURE)
    this.player.setOrigin(0, 0)

    const keys = this.input.keyboard.addKeys('W,A,S,D')
    this.controls = new Controls(keys)
    this.lastMoveTime = 0
  }

  update (time, delta) {
    const [anyPressed, presses] = this.controls.areAnyPressed()
    if (anyPressed && time - this.lastMoveTime > 400) {
      if (presses.down) {
        this.player.setY(this.player.y + 32)
      } else if (presses.up) {
        this.player.setY(this.player.y - 32)
      } else if (presses.left) {
        this.player.setX(this.player.x - 32)
      } else if (presses.right) {
        this.player.setX(this.player.x + 32)
      }
      this.lastMoveTime = time
    }

    if (this.player.y < 0) {
      this.scene.start('game_over')
    }
  }
}
