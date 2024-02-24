const PlayField = require('./play_field')

test('creation', () => {
  const pf = new PlayField(10, 10, { x: 5, y: 7 }, 8, 8)
  expect(pf).toBeTruthy()
})

test('coordinates', () => {
  const pf = new PlayField(3, 2, { x: 1, y: 3 }, 5, 3)
  const expected = [
    { x: 1, y: 3 },
    { x: 6, y: 3 },
    { x: 11, y: 3 },
    { x: 1, y: 6 },
    { x: 6, y: 6 },
    { x: 11, y: 6 }
  ]
  expect(pf.getTileCoordinates()).toEqual(expected)
})
