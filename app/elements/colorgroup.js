var bel = require('bel')

function colorGroup (item) {
  return bel`
    <div class="flex items-center">
      <h1 class="f4 fw6 mb1 w-90 truncate">
        ${item}
      </h1>
    </div>
`
}

module.exports = colorGroup
