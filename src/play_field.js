class PlayField {
  constructor (gridWidth, gridHeight, gridOrigin, tileWidth, tileHeight) {
    this._gridHeight = gridHeight
    this._gridWidth = gridWidth
    this._gridOrigin = gridOrigin
    this._tileHeight = tileHeight
    this._tileWidth = tileWidth
  }

  getTileCoordinates () {
    const coordinates = []
    for (let gridY = 0; gridY < this._gridHeight; gridY++) {
      for (let gridX = 0; gridX < this._gridWidth; gridX++) {
        coordinates.push({
          x: this._gridOrigin.x + gridX * this._tileWidth,
          y: this._gridOrigin.y + gridY * this._tileHeight
        })
      }
    }
    return coordinates
  }
}

module.exports = PlayField
