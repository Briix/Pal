var bel = require('bel')
var sf = require('sheetify')

var navStyle = sf`
  :host {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    height: 2.3rem;
  }
`

function navbar (config) {
  return bel`
    <nav
      class="${navStyle} top-0 tc flex items-center justify-center w-100 fixed z-9999"
      style="background-color:${config.backgroundColor}">
      <span class="f6">Pal</span>
    </nav>
  `
}

module.exports = navbar
