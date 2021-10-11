const { MessageEmbed } = require("discord.js");
require('dotenv').config();

const MessageWrapper = require('../common/messageWrapper');

module.exports = class Helper extends MessageWrapper {

  constructor() { }

  static match(message, prefix) {
    return message.content.startsWith(prefix + 'help');
  }

  static action(message, client, conf) {
    this.getHelperMessage(message, conf);
  }

  static getHelperMessage(message, conf) {
    message.delete();
    const em = new MessageEmbed()
      .setColor(0x7C147B)
      .setTitle(conf.help.title)
      .setTimestamp();
    message.channel.send({embeds: [em]});
  }
}