# ![Pal Icon](./assets/icons/Icon.png) Pal

> :art: Tiny app for managing color palettes

Pal aims to be a simple and customizable color palette manager/viewer and does exactly and
only that. On first run it creates a dotfile in your home directory that will
hold both your settings and your color palettes.

For now colors can only be added directly in the dotfile.

[Read more about the settings](#user-content-settings).

## Downloads
Pal currently only runs on macOS and pre-built binaries can be found on the
[releases page](https://github.com/Briix/Pal/releases/).

If you want to build the app yourself or try it out on other platforms,
checkout the [development section](#user-content-dev).

## Settings
Pal can be customized through its dotfile located at `{HOMEDIR}/.pal`.

The following settings can be used.
### `backgroundColor`
Background color for the entire app.

Default: `#333`

### `textColor`
Text color for the entire app.

Default: `#FFF`

### `tilesPerLine`
How many color tiles to show per line.

Default: `5`

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

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

MIT © [Simon Brix](http://simonbrix.dk)
