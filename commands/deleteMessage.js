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
    const number = message.content.split(" ")[1];

    if (message.guild.roles.cache.find(r => r.id === process.env.DISCORD_OWNER_ROLE)) {
      if (number <= 100) {
        const clear = async () => {
          const messages = await message.channel.messages.fetch({ limit: number });
          message.channel.bulkDelete(messages);
        }
        clear();
      } else {
        console.log("Number is too big");
      }
    } else {
      console.log("You cannot use this command !");
    }
  }
}