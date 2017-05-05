var bel = require('bel')
var config = window.require('electron').remote.getGlobal('config')
var navbar = require('../elements/navbar')
var colorGroup = require('../elements/colorgroup')
var colorTile = require('../elements/colortile')

function main (state, prev, send) {
  return bel`
    <div class="sans-serif" style="color: ${config.textColor}">
      ${navbar(config)}
      <main id="main" class="ph3 mt4 fixed absolute--fill overflow-scroll" style="background-color: ${config.backgroundColor}">
        ${config.colors.map((item) => {
          return bel`
            <div class="mb3">
              ${colorGroup(item.name)}
              <div class="flex flex-wrap">
                ${item.colors.map((item) => {
                  return colorTile(item, config.tilesPerLine)
                })}
              </div>
            </div>
          `
        })}
      </main>
    </div>
  `
}

module.exports = main
