'use strict';
const electron = require('electron');

const app = electron.app;
const config = require('./config')

config.init()

app.config = config.getConfig()
global.config = app.config
global.configFn = config

app.config.hideDock ? app.dock.hide() : app.dock.show()

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 290,
		height: 460,
    titleBarStyle: 'hidden-inset',
    backgroundColor: app.config.backgroundColor
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
  let shortcut
  let shown = true
  if (app.config.globalShortcut) {
    shortcut = electron.globalShortcut.register(app.config.globalShortcut, () => {
      if (shown) {
        app.hide();
        shown = false
      } else {
        mainWindow.show();
        shown = true
      }
    })
  }
});
