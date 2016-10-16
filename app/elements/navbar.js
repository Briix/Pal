const bel = require('bel')
const sf = require('sheetify')
const plus = require('./plus')
const colorGroup = require('./colorgroup')

const navStyle = sf`
  :host {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    height: 2.3rem;
  }
  .plus {
    -webkit-app-region: no-drag;
  }
`

const addColorGroup = () => {
  const element = colorGroup("New color group", true)
  const node = document.getElementById('main')
  node.insertBefore(element, node.childNodes[0])
}

const navbar = (config) => bel`
  <nav
    class="${navStyle} top-0 tc flex items-center justify-center w-100 fixed z-9999"
    style="background-color:${config.backgroundColor}">
    <span class="f6">Colors</span>
    ${plus('f5 absolute right-1', addColorGroup)}
  </nav>
`

module.exports = navbar
