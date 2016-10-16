const bel = require('bel')
const configFn = window.require('electron').remote.getGlobal('configFn')
const debounce = require('../utils/debounce')
const colorTile = require('./colortile')
const plus = require('./plus')

const nameChange = debounce((e) => {
  configFn.insertColorGroup(e.target.innerText)
}, 1000)

const colorGroup = (item, editable) => {
  editable = editable || false

  return bel`
    <div class="flex  items-center">
      <h1
        class="f4 mb1 w-90"
        contenteditable=${editable}
        oninput=${(e) => {nameChange(e)}}>
        ${item}
      </h1>
      ${plus('tr f4 w-10 mb1 mt2', () => {
        console.log("clicked")
      })}
    </div>
`
}

module.exports = colorGroup
