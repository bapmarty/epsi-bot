require('dotenv').config();

module.exports = class MessageWrapper {
  constructor () {
  }

  static parse(message, client, conf) {
    const prefix = conf.global.prefix;
    if (this.match(message, prefix)) {
      this.action(message, client, conf);
      return true;
    }
    return false;
  }

  static match(message, prefix) {
    return false;
  } 
  
  static action(message, client, conf) { }
}