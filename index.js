'use strict'
var electron = require('electron')

var app = electron.app
var config = require('./config')

config.init()

var defaultConfig = {
  hideDock: false
}

app.config = config.getConfig() || defaultConfig
global.config = app.config
global.configFn = config

app.config.hideDock ? app.dock.hide() : app.dock.show()

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')()

// prevent window being garbage collected
var mainWindow
var shown = true

function onClosed () {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null
  app.hide()
  shown = false
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

app.on('browser-window-blur', function () {
  shown = false
})

app.on('activate', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', function () {
  mainWindow = createMainWindow()
  if (app.config.globalShortcut) {
    electron.globalShortcut.register(app.config.globalShortcut, function () {
      if (shown) {
        app.hide()
        shown = false
      } else {
        if (!mainWindow) {
          mainWindow = createMainWindow()
        } else {
          mainWindow.show()
        }
        shown = true
      }
    })
  }
})
