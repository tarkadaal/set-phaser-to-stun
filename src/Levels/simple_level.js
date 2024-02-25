import Phaser from 'phaser/dist/phaser.min.js'

import Controls from '../controls.js'

import aTile from 'Assets/textures/tiles.png'
import Map from 'Assets/textures/test.json'
import PlayerImage from 'Assets/textures/flamey-fin.png'
import PlayerJSON from 'Assets/textures/flamey-fin.json'

// const PLAYER_TEXTURE = 'player-texture'
 
//import PlayerImage from 'Assets/textures/player.png'
import EnemyImage from 'Assets/textures/enemy.png'

//const PLAYER_TEXTURE = 'player-texture'
const ENEMY_TEXTURE = 'enemy-texture'
 
const TILE_SIZE = 32

export default class SimpleLevel extends Phaser.Scene {
  constructor () {
    super({ key: 'simple_level' })
  }

  preload () {
    this.load.tilemapTiledJSON('map', Map)
    this.load.image('tiles', aTile)
    this.load.aseprite('player', PlayerImage, PlayerJSON)

    //this.load.image(PLAYER_TEXTURE, PlayerImage)
    this.load.image(ENEMY_TEXTURE, EnemyImage)

  }

  create () {
    const map = this.make.tilemap({ key: 'map', tileWidth: TILE_SIZE, tileHeight: TILE_SIZE })
    const tileset = map.addTilesetImage('floating-tileset', 'tiles')
    this.layerGround = map.createLayer('ground', tileset, 0, 0).setPipeline('Light2D')
    this.layerWater = map.createLayer('water', tileset, 0, 0).setPipeline('Light2D')
    this.layerHill = map.createLayer('hill', tileset, 0, 0).setPipeline('Light2D')
    this.layerBush = map.createLayer('bush', tileset, 0, 0).setPipeline('Light2D')

    for (const layer of [this.layerHill, this.layerBush, this.layerWater, this.layerGround]) {
      layer.setScale(2)
    }

    this.layerWater.setCollisionByExclusion([-1])
    this.layerBush.setCollisionByExclusion([-1])


    this.anims.createFromAseprite('player')

    this.player = this.physics.add.sprite(TILE_SIZE, TILE_SIZE, 'player').setPipeline('Light2D')
    this.player.play({ key: 'idle', repeat: -1 })

    //this.player = this.physics.add.image(TILE_SIZE, TILE_SIZE, PLAYER_TEXTURE).setPipeline('Light2D')

    this.player.setOrigin(0, 0)
    this.physics.add.collider(this.player, this.layerWater)
    this.physics.add.collider(this.player, this.layerBush)
    this.player.light = this.lights.addLight(TILE_SIZE + (TILE_SIZE / 2), TILE_SIZE + (TILE_SIZE + 2), 128).setColor(0xfb5236).setIntensity(2.0)
    this.lights.enable().setAmbientColor(0x000000)

    this.enemies = []
    this.enemies.push(this._createEnemy(10, 1, 'left'))
    this.enemies.push(this._createEnemy(6, 10, 'down'))
    this.enemies.push(this._createEnemy(5, 14, 'down'))

    const keys = this.input.keyboard.addKeys('W,A,S,D')
    this.controls = new Controls(keys)
    this.lastMoveTime = 0
  }

  update (time, delta) {
    const [anyPressed, presses] = this.controls.areAnyPressed()
    const allowedToMove = time - this.lastMoveTime > 250
    const speed = 128
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
    this.player.light.x = this.player.body.x + (TILE_SIZE / 2)
    this.player.light.y = this.player.body.y + (TILE_SIZE / 2)
    this.player.light.diameter = 160 + Math.floor(Math.random() * 40)
    for (const enemy of this.enemies) {
      this._updateEnemy(enemy, time)
    }
  }

  _createEnemy (x, y, direction) {
    const enemy = this.physics.add.image(TILE_SIZE * x, TILE_SIZE * y, ENEMY_TEXTURE).setPipeline('Light2D')
    enemy.setOrigin(0, 0)
    enemy.direction = direction
    this.physics.add.collider(enemy, this.layerWater)
    this.physics.add.collider(enemy, this.layerBush)
    this.physics.add.overlap(enemy, this.player, this._enemyOverlap, null, this)
    enemy.lastMoveTime = 0
    return enemy
  }

  _enemyOverlap (enemy, player) {
    this.scene.start('game_over')
  }

  _updateEnemy (enemy, time) {
    const moving = (enemy.body.velocity.x || enemy.body.velocity.y)
    const allowedToMove = time - enemy.lastMoveTime > 250
    const speed = 128
    if (allowedToMove) {
      // This if block makes the player "snap" to the nearest tile. Without this,
      // there's no way of guaranteeing that the player won't overshoot by a
      // fraction of a pixel, which *looks* fine, but *technically* makes you
      // clash with a different tile.
      // Why yes, this bit was a complete arse, why do you ask?
      if (moving) {
        const numX = enemy.body.x + TILE_SIZE / 2
        const nearestX = numX - (numX % TILE_SIZE)
        const numY = enemy.body.y + TILE_SIZE / 2
        const nearestY = numY - (numY % TILE_SIZE)
        enemy.body.x = nearestX
        enemy.body.y = nearestY
        enemy.lastMoveTime = time
      }
    }
    if (!moving) {
      switch (enemy.direction) {
        case 'left':
          enemy.direction = 'right'
          enemy.body.setVelocityX(speed)
          break
        case 'right':
          enemy.direction = 'left'
          enemy.body.setVelocityX(-speed)
          break
        case 'up':
          enemy.direction = 'down'
          enemy.body.setVelocityY(speed)
          break
        case 'down':
          enemy.direction = 'up'
          enemy.body.setVelocityY(-speed)
          break
      }
    }
  }
}
