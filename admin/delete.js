const { MessageEmbed } = require("discord.js");

const MessageWrapper = require("../common/messageWrapper");

require('dotenv').config();

module.exports = class Delete extends MessageWrapper {
  static match(message, prefix) {
    return message.content.startsWith(prefix + "delete" || prefix + "d");
  }

  static action(message, client, conf) {
    if (message.member.roles.cache.some(r => r.name === conf.roles.owner)) {
      this.deleteLastMessage(message, client, conf);
    }
  }

  static deleteLastMessage(message, client, conf) {
    let number = message.content.split(" ")[1];

    number = number === undefined ? 2 : number;
    if (number <= 100) {
      message.delete();
      const clear = async () => {
        const messages = await message.channel.messages.fetch({ limit: number });
        await message.channel.bulkDelete(messages);
      }
      clear().catch(err => console.error(err.status));
    } else {
      message.delete();
      const em = new MessageEmbed()
        .setColor(0x7C147B)
        .setDescription(conf.commands.delete.erros.bigNumber)

      message.channel.send({embeds: [em]});
    }
  }
}
