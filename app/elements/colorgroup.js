const bel = require('bel')
const colorTile = require('./colortile')

const colorGroup = (item, editable) => {
  editable = editable || false

  return bel`
    <div class="flex  items-center">
      <h1
        class="f4 mb1 w-90"
        contenteditable=${editable}>
        ${item}
      </h1>
    </div>
`
}

module.exports = colorGroup
