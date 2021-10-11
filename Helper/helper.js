const { MessageEmbed } = require("discord.js");
require('dotenv').config();

const MessageWrapper = require('../common/messageWrapper');
const ConfigYaml = require('../config/config');

const conf = new ConfigYaml().conf;

module.exports = class Helper extends MessageWrapper {

  constructor() { }

  static match(message, prefix = process.env.DISCORD_PREFIX) {
    return message.content.startsWith(prefix + 'help');
  }

  static action(message, client) {
    this.getHelperMessage(message);
  }

  static getHelperMessage(message) {
    message.delete();
    const em = new MessageEmbed()
      .setColor(0x7C147B)
      .setTitle(conf.help.title)
      .setTimestamp();
    message.channel.send({embeds: [em]});
  }
}