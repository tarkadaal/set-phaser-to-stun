import Phaser from 'phaser/dist/phaser.min.js'

import Controls from '../controls.js'

import aTile from 'Assets/textures/tiles.png'
import Map from 'Assets/textures/test.json'
import PlayerImage from 'Assets/textures/player.png'
import EnemyImage from 'Assets/textures/enemy.png'

const PLAYER_TEXTURE = 'player-texture'
const ENEMY_TEXTURE = 'enemy-texture'
const TILE_SIZE = 32

export default class SimpleLevel extends Phaser.Scene {
  constructor () {
    super({ key: 'simple_level' })
  }

  preload () {
    this.load.tilemapTiledJSON('map', Map)
    this.load.image('tiles', aTile)
    this.load.image(PLAYER_TEXTURE, PlayerImage)
    this.load.image(ENEMY_TEXTURE, EnemyImage)
  }

  create () {
    const map = this.make.tilemap({ key: 'map', tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
    const tileset = map.addTilesetImage('floating-tileset', 'tiles')
    this.layerGround = map.createLayer('ground', tileset, 0, 0)
    this.layerWater = map.createLayer('water', tileset, 0, 0)
    this.layerHill = map.createLayer('hill', tileset, 0, 0)
    this.layerBush = map.createLayer('bush', tileset, 0, 0)

    for (const layer of [this.layerHill, this.layerBush, this.layerWater, this.layerGround]) {
      layer.setScale(2)
    }

    this.layerWater.setCollisionByExclusion([-1])
    this.layerBush.setCollisionByExclusion([-1])

    this.player = this.physics.add.image(TILE_SIZE, TILE_SIZE, PLAYER_TEXTURE)
    this.player.setOrigin(0, 0)
    this.physics.add.collider(this.player, this.layerWater)
    this.physics.add.collider(this.player, this.layerBush)

    this.enemies = []
    this.enemies.push(this._createEnemy(10, 1, 'left'))
    this.enemies.push(this._createEnemy(3, 10, 'down'))

    const keys = this.input.keyboard.addKeys('W,A,S,D')
    this.controls = new Controls(keys)
    this.lastMoveTime = 0
  }

  update (time, delta) {
    const [anyPressed, presses] = this.controls.areAnyPressed()
    const allowedToMove = time - this.lastMoveTime > 250
    const speed = 128
    if (allowedToMove) {
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

  _createEnemy (x, y, direction) {
    const enemy = this.physics.add.image(TILE_SIZE * x, TILE_SIZE * y, ENEMY_TEXTURE)
    enemy.setOrigin(0, 0)
    enemy.direction = direction
    this.physics.add.collider(enemy, this.layerWater)
    this.physics.add.collider(enemy, this.layerBush)
    this.physics.add.collider(enemy, this.player)
    return enemy
  }
}
