class Controls {
  constructor (keys) {
    this.keys = keys
  }

  isUpPressed () {
    return this.keys.W.isDown
  }

  isDownPressed () {
    return this.keys.S.isDown
  }

  isLeftPressed () {
    return this.keys.A.isDown
  }

  isRightPressed () {
    return this.keys.D.isDown
  }
}

module.exports = Controls
