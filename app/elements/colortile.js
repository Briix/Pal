const bel = require('bel')
const copy = require('../utils/copy')

const colorTile = (item) => {
  return bel`
    <div
      class="h2 w2 dim"
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
