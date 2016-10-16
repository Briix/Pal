const bel = require('bel')
const sf = require('sheetify')
const colorGroup = require('./colorgroup')

const navStyle = sf`
  :host {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    height: 2.3rem;
  }
`

const navbar = (config) => bel`
  <nav
    class="${navStyle} top-0 tc flex items-center justify-center w-100 fixed z-9999"
    style="background-color:${config.backgroundColor}">
    <span class="f6">Colors</span>
  </nav>
`

module.exports = navbar
