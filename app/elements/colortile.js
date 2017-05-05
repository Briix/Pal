var bel = require('bel')
var copy = require('../utils/copy')

function colorTile (item) {
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
      class="h2 w2 dim pointer"
      id="colortile"
      style="background-color:${item}"
      onclick=${copyHex}>
    </div>
  `
}

module.exports = colorTile
