const bel = require('bel')
const sf = require('sheetify')
const config = window.require('electron').remote.getGlobal('config')
const navbar = require('../elements/navbar')
const colorGroup = require('../elements/colorgroup')
const colorTile = require('../elements/colortile')

const main = (state, prev, send) => bel`
  <div style="color: ${config.textColor}">
    ${navbar(config)}
    <main id="main" class="ph3 mt4 fixed absolute--fill overflow-scroll">
      ${config.colors.map((item) => {
        return bel`
          <div class="mb3">
            ${colorGroup(item.name)}
            <div class="flex flex-wrap">
              ${item.colors.map((item) => {
                return colorTile(item)
              })}
            </div>
          </div>
        `
      })}
    </main>
  </div>
`

module.exports = main
