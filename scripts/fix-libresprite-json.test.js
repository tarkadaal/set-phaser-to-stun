const fixer = require('./fix-libresprite-json')

test('adds 1 + 1 to make 2', () => {
  expect(1 + 1).toBe(2)
})

test('can call fixAnimationObject with no frames', () => {
  const testObj = { frames: [] }
  fixer.fixAnimationObject(testObj)
})

test('can call fixAnimationObject without frames key', () => {
  const testObj = {}
  fixer.fixAnimationObject(testObj)
})

test('can correct frame keys', () => {
  const testObj = {
    extraData: 'check this was not altered',
    frames: {
      'sprite_name 0.aseprite': { data: 'unchanged 0' },
      'sprite_name 1.aseprite': { data: 'unchanged 1' }
    }
  }
  const expected = {
    extraData: 'check this was not altered',
    frames: {
      0: { data: 'unchanged 0' },
      1: { data: 'unchanged 1' }
    }
  }

  fixer.fixAnimationObject(testObj)
  expect(testObj).toEqual(expected)
})

test('can handle frame keys that are correct', () => {
  const testObj = {
    extraData: 'check this was not altered',
    frames: {
      0: { data: 'unchanged 0' },
      1: { data: 'unchanged 1' }
    }
  }
  const expected = {
    extraData: 'check this was not altered',
    frames: {
      0: { data: 'unchanged 0' },
      1: { data: 'unchanged 1' }
    }
  }

  fixer.fixAnimationObject(testObj)
  expect(testObj).toEqual(expected)
})
