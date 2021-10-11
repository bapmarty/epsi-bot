const YAML = require("yaml");
const fs = require("fs");

module.exports = class ConfigYaml {
  constructor () {
    this.conf = YAML.parse(fs.readFileSync('./config/config.yml', 'utf-8'));
  }
}

