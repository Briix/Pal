var bel = require('bel')
var copy = require('../utils/copy')

function colorTile (item) {
  return bel`
    <div
      class="h2 w2 dim pointer"
      id="colortile"
      style="background-color:${item}"
      onclick=${(e) => { copy(item, () => {
        new Notification('Copied!', {
          body: `\'${item}\' copied to clipboard`,
          silent: true
        })
      }) }}>
    </div>
  `
}

module.exports = colorTile
