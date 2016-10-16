const os = require('os')
const fs = require('fs')
const path = require('path')

const cfgPath = path.resolve(os.homedir(), '.colors')
let cfg = {}

const requireJSON = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const load = (str) => {
  const _cfg = requireJSON(str)

  if (!_cfg.config) {
    throw new Error('Error reading configuration: `config` key is missing')
  }

  cfg = _cfg
  return true
}

exports.init = () => {
  try {
    load(cfgPath)
  } catch (err) {
    console.log(err)
    console.log('read error', cfgPath, err.message)
    const defaultConfig = path.resolve(__dirname, 'default-config.js')
    try {
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
