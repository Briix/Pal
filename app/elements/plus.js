const bel = require('bel')

const plus = (classes, fn) => {
  return bel`
    <span
      class="plus pointer ${classes}"
      onclick=${() => {fn()}}>
      +
    </span>
  `
}

module.exports = plus
