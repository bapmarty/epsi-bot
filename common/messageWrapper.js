require('dotenv').config();

module.exports = class MessageWrapper {
  constructor () {
    this.prefix = process.env.DISCORD_PREFIX;
  }

  static parse(message, client) {
    if (this.match(message, this.prefix)) {
      this.action(message, client);
      return true;
    }
    return false;
  }

  static match(message, prefix = this.prefix) {
    return false;
  } 
  
  static action(message, client) { }
}