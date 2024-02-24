import Phaser from 'phaser/dist/phaser.min.js'
import DevTile from 'Assets/textures/dev-tile.png'

const DEFAULT_TILE = 'dev-tile'

export default class Level extends Phaser.Scene {
  preload () {
    this.load.image(DEFAULT_TILE, DevTile)
    this.GRID_HEIGHT = 20
    this.GRID_WIDTH = 20
    this.TILE_HEIGHT = 24
    this.TILE_WIDTH = 24
  }

  create () {
    this.add.text(20, 20, 'This is where the magic will happen, baby')

    for (let gridX = 0; gridX < this.GRID_WIDTH; gridX++) {
      for (let gridY = 0; gridY < this.GRID_HEIGHT; gridY++) {
        const tile = this.add.image(gridX * this.TILE_WIDTH, gridY * this.TILE_HEIGHT, DEFAULT_TILE)
        tile.setOrigin(0, 0)
      }
    }
  }
}
