const { MessageEmbed } = require("discord.js");
const MessageWrapper = require("../common/messageWrapper");

module.exports = class Site extends MessageWrapper {
  static match(message, prefix) {
    return message.content.startsWith(prefix + "site");
  }

  static action(message, client, conf) {
    const em = new MessageEmbed()
      .setColor(0x7C147B)
      .setThumbnail(client.user.avatarURL)
      .setTitle(conf.commands.site.title)
      .setDescription(conf.commands.site.description);
    message.channel.send({embeds: [em]});
  }
}