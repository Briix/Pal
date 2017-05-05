var choo = require('choo')
var sf = require('sheetify')
var app = choo()

sf('tachyons')

app.router((route) => [
  route('/', require('./pages/main'))
])

var tree = app.start()
document.body.appendChild(tree)
