// You can export your animation from LibreSprite, which is great!
// Unfortunately, LibreSprite and Phaser JS disagree on the exact
// format. This script is to alter the JSON files produced by
// LibreSprite so that they can be used in Phaser without issue.
const fs = require('fs')
const path = require('path')

function tryGetFirstMatch (tag) {
  return tag && tag[0] ? tag[0] : null
}

// Alters parameter in-place
function fixAnimationObject (data) {
  const frames = data.frames ? data.frames : {}

  for (const k of Object.keys(frames)) {
    const result = k.match(/\d+\.ase.*/g)
    const tag = tryGetFirstMatch(result)
    if (tag) {
      const index = tag.match(/\d+/g)[0]
      data.frames[index] = data.frames[k]
      delete data.frames[k]
    }
  }
}

function fixAllJSONInAssetsDirectory () {
  const dir = fs.opendirSync('./assets/textures')
  let entry = dir.readSync()
  while (entry) {
    if (entry.isFile()) {
      const entryPath = path.join(entry.path, entry.name)
      if (path.extname(entryPath) === '.json') {
        const data = JSON.parse(fs.readFileSync(entryPath))
        fixAnimationObject(data)
        fs.writeFile(entryPath, JSON.stringify(data, null, 2), x => {})
      }
    }

    entry = dir.readSync()
  }
}
module.exports = { fixAnimationObject }

if (require.main === module) {
  fixAllJSONInAssetsDirectory()
}
