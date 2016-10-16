const choo = require('choo')
const html = require('choo/html')
const sf = require('sheetify')
const app = choo()

sf('tachyons')

app.router((route) => [
  route('/', require('./pages/main'))
])

const tree = app.start()
document.body.appendChild(tree)
