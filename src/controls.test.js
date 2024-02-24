const Controls = require('./controls')
test('creation', () => {
  const c = new Controls()
  expect(c).toBeTruthy()
})

test('Mapping W to UP', () => {
  const c = new Controls({ W: { isDown: true } })
  expect(c.isUpPressed()).toEqual(true)
})

test('Mapping W to UP, but checking it is not active', () => {
  const c = new Controls({ W: { isDown: false } })
  expect(c.isUpPressed()).toEqual(false)
})
test('Mapping S to DOWN', () => {
  const c = new Controls({ W: { isDown: false }, S: { isDown: true } })
  expect(c.isDownPressed()).toEqual(true)
})
test('Mapping A to LEFT', () => {
  const c = new Controls({ A: { isDown: true } })
  expect(c.isLeftPressed()).toEqual(true)
})
test('Mapping D to RIGHT', () => {
  const c = new Controls({ D: { isDown: true } })
  expect(c.isRightPressed()).toEqual(true)
})
