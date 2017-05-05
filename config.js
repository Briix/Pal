var os = require('os')
var fs = require('fs')
var path = require('path')

var cfgPath = path.resolve(os.homedir(), '.pal')
var cfg = {}

function requireJSON (filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function configExists (filePath) {
	return fs.existsSync(filePath)
}

function load (str) {
  var _cfg = requireJSON(str)

  cfg = _cfg
  return true
}

exports.init = function () {
	if (configExists(cfgPath)) {
		try {
			load(cfgPath)
		} catch (err) {
			console.log(err)
		}
	} else {
    try {
    	var defaultConfig = path.resolve(__dirname, 'default-config.js')
      console.log('attempting to write default config to', cfgPath)
      load(defaultConfig)
      fs.writeFileSync(cfgPath, fs.readFileSync(defaultConfig))
    } catch (err) {
      console.log(err)
      throw new Error(`Failed to write config to ${cfgPath}`)
    }
	}
}

exports.getConfig = function () {
  return cfg.config
}
