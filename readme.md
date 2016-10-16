# Paletto

> :art: Tiny app for managing color palettes
Paletto aims to be a simple and customizable color palette manager/viewer and does exactly and
only that. On first runs it creates a dotfile in your home directory that will
hold both your settings and your color palettes. 

For now colors can only be added directly in the dotfile.

[Read more about the settings](#user-content-settings).

## Downloads
Paletto currently only runs on macOS and prebuilt binaries can be found on the
relases page.

If you want to build the app yourself or try it out on other platforms,
checkout the [development section](#user-content-dev).

## Settings
Paletto can be customized through its dotfile located at `{HOMEDIR}/.paletto`.

The following settings can be used.
### `backgroundColor`
Background color for the entire app.

Default: `"#FFF"`

### `textColor`
Text color for the entire app.

Default: `#333`

### `globalShortcut`
Sets a global shortcut that will show/hide the app, e.g. `Shift+Ctrl+P`

### `hideDock`
Determines whether to show the app in the dock or not

## Dev

```
$ npm install
```

### Run

```
$ npm start
```

### Build

```
$ npm run build
```

Builds the app for macOS using [electron-packager](https://github.com/electron-userland/electron-packager).


## License

MIT © [Simon Brix](http://simonbrix.dk)
