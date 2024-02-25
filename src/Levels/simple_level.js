import Phaser from 'phaser/dist/phaser.min.js'

import Controls from '../controls.js'

import aTile from 'Assets/textures/tiles.png'
import Map from 'Assets/textures/test.json'
import PlayerImage from 'Assets/textures/flamey-fin.png'
import PlayerJSON from 'Assets/textures/flamey-fin.json'

// const PLAYER_TEXTURE = 'player-texture'
const TILE_SIZE = 32

export default class SimpleLevel extends Phaser.Scene {
  constructor () {
    super({ key: 'simple_level' })
  }

  preload () {
    this.load.tilemapTiledJSON('map', Map)
    this.load.image('tiles', aTile)
    this.load.aseprite('player', PlayerImage, PlayerJSON)
  }

  create () {
    const map = this.make.tilemap({ key: 'map', tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
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

    const Anims = this.anims.createFromAseprite('player')
    console.log(Anims)

    this.player = this.physics.add.sprite(TILE_SIZE, TILE_SIZE, 'player')
    this.player.play({ key: 'idle', repeat: -1 })
    this.player.setOrigin(0, 0)
    this.physics.add.collider(this.player, layerWater)
    this.physics.add.collider(this.player, layerBush)

    const keys = this.input.keyboard.addKeys('W,A,S,D')
    this.controls = new Controls(keys)
    this.lastMoveTime = 0
  }

  update (time, delta) {
    const [anyPressed, presses] = this.controls.areAnyPressed()
    const allowedToMove = time - this.lastMoveTime > 500
    const speed = 66
    if (allowedToMove) {
      // this.player.anims.play('walk')
      // This if block makes the player "snap" to the nearest tile. Without this,
      // there's no way of guaranteeing that the player won't overshoot by a
      // fraction of a pixel, which *looks* fine, but *technically* makes you
      // clash with a different tile.
      // Why yes, this bit was a complete arse, why do you ask?
      if (this.player.body.velocity.x || this.player.body.velocity.y) {
        const numX = this.player.body.x + TILE_SIZE / 2
        const nearestX = numX - (numX % TILE_SIZE)
        const numY = this.player.body.y + TILE_SIZE / 2
        const nearestY = numY - (numY % TILE_SIZE)
        this.player.body.setVelocity(0)
        // this.player.anims.play('walk', false)
        this.player.body.reset(nearestX, nearestY)
      }

      if (anyPressed) {
        if (presses.down) {
          this.player.body.setVelocityY(speed)
        } else if (presses.up) {
          this.player.body.setVelocityY(-speed)
        } else if (presses.left) {
          this.player.body.setVelocityX(-speed)
        } else if (presses.right) {
          this.player.body.setVelocityX(speed)
        }
        this.lastMoveTime = time
      }
    }
    if (this.player.y < 0) {
      this.scene.start('game_over')
    }
  }
}
