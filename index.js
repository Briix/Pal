'use strict'
var electron = require('electron')

var app = electron.app
var config = require('./config')

config.init()

app.config = config.getConfig()
global.config = app.config
global.configFn = config

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()

// prevent window from being garbage collected
var mainWindow

function onClosed () {
  // de-reference the window
  // to store multiple windows in an array
  mainWindow = null
}

function createMainWindow () {
  var win = new electron.BrowserWindow({
    width: 290,
    height: 460,
    titleBarStyle: 'hidden-inset'
  })

  win.loadURL(`file://${__dirname}/index.html`)
  win.on('closed', onClosed)

  return win
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', function () {
  mainWindow = createMainWindow()
})
