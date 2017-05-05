var bel = require('bel')
var copy = require('../utils/copy')

function colorTile (item, tilesPerLine) {
  var tileWidth = Math.floor(100/(tilesPerLine + 1)) // Well this needs to be fixed

  function copyHex () {
    copy(item, function () {
      var notification = new Notification('Copied!', {
        body: `'${item}' copied to clipboard`,
        silent: true
      })
    })
  }

  return bel`
    <div
      class="dim pointer"
      id="colortile"
      style="background-color: ${item}; width: ${tileWidth}vw; height: ${tileWidth}vw;"
      onclick=${copyHex}>
    </div>
  `
}

module.exports = colorTile
