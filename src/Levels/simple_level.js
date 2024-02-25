import Phaser from 'phaser/dist/phaser.min.js'

import aTile from 'Assets/textures/tiles.png'
import Map from 'Assets/textures/test.json'

export default class SimpleLevel extends Phaser.Scene {
  preload () {
    this.load.tilemapTiledJSON('map', Map)
    this.load.image('tiles', aTile)
  }

  create () {
    // this.add.text(0, 0, 'test test', { fill: '#ffffff', fontSize: '42px' })
    // this.add.image(0, 0, 'tiles')
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
  }
}
