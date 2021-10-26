const { MessageEmbed } = require("discord.js");

const MessageWrapper = require('../common/messageWrapper');
const Logs = require("../channels/Logs");

module.exports = class Helper extends MessageWrapper {

  constructor() {
    super();
  }

  static match(message, prefix) {
    return message.content.startsWith(prefix + 'help') || message.content.startsWith(prefix + 'h');
  }

  static action(message, client, conf) {
    const command = message.content.split(" ")[1] || "";
    if (message.member.roles.cache.some(r => r.name === conf.roles.owner) && (command === "--admin" || command === "-a")) {
      this.printAdminHelperMessage(message, client, conf);
    } else {
      this.printHelperMessage(message, client, conf);
    }
  }

  static printHelperMessage(message, client, conf) {
    message.delete();
    new Logs(message, client, conf.commands.help.log, 0x008000, conf.listeners.logs.channel);
    const em = new MessageEmbed()
      .setColor(0x7C147B)
      .setAuthor(client.user.username, client.user.avatarURL(), "https://epsiwis.fr/")
      .setThumbnail(client.user.avatarURL())
      .setDescription(conf.commands.help.description)
      .setTimestamp()
      .setFooter(conf.embeds.footer.replace("%version%", conf.global.version));
    message.channel.send({embeds: [em]});
  }

  static printAdminHelperMessage(message, client, conf) {
    message.delete();
    const channelId = client.channels.cache.find(c => c.name === conf.commands.admin.update.channel);
    const em = new MessageEmbed()
      .setColor(0x7C147B)
      .setAuthor(client.user.username, client.user.avatarURL(), "https://epsiwis.fr/")
      .setThumbnail(client.user.avatarURL())
      .setDescription(conf.commands.admin.help.description.replace("%channel%", channelId.id))
      .setTimestamp()
      .setFooter(conf.embeds.footer.replace("%version%", conf.global.version));
    message.channel.send({embeds: [em]});
  }
}
