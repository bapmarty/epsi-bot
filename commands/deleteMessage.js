const { MessageEmbed } = require("discord.js");

const MessageWrapper = require("../common/messageWrapper");

require('dotenv').config();

module.exports = class DeleteMessage extends MessageWrapper {

  constructor() { }

  static match(message, prefix = process.env.DISCORD_PREFIX) {
    return message.content.startsWith(prefix + "delete");
  }

  static action(message, client, conf) {
    this.deleteLastMessage(message, client, conf);
  }

  static deleteLastMessage(message, client, conf) {
    let number = message.content.split(" ")[1];

    if (number === undefined) {
      number = 1;
    }

    if (message.member.roles.cache.some(r => r.id === process.env.DISCORD_OWNER_ROLE)) {
      if (number <= 100) {
        message.delete();
        const clear = async () => {
          const messages = await message.channel.messages.fetch({ limit: number });
          message.channel.bulkDelete(messages);
        }
        clear();
      } else {
        message.delete();
        const em = new MessageEmbed()
          .setColor(0x7C147B)
          .setDescription(conf.deleteCommand.tooBigNumber)

        message.channel.send({embeds: [em]});
      }
    } else {
      message.delete();
      const em = new MessageEmbed()
        .setColor(0x7C147B)
        .setDescription(conf.deleteCommand.notPermitted)

      message.channel.send({embeds: [em]});
    }
  }
}